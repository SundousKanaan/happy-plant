import React, { useEffect, useState } from "react";
import CameraComponent from "@/src/components/CameraComponent/CameraComponent";
import Button from "@/src/components/Button/Button";
import cs from "classnames";
import { useStapper } from "@/src/contexts/tutorialStapper/tutorialStapper";
import useCamera from "@/src/hooks/useCamera";
import { useDialog } from "@/src/contexts/dialogContext/dialogContext";
import PopUp from "@/src/components/PopUp/PopUp";
import texts from "@/ts/texts";
import $ from "./Camera.module.scss";
import { useRouter } from "next/router";
import Dialog from "@/src/components/Dialog/Dialog";

const CameraPage = () => {
  const { handleCustomStap } = useStapper();
  const { openDialog, closeDialog, isOpen } = useDialog();
  const {
    getSavedBackgroundImage,
    savedBackgroundImage,
    captureImage,
    takeBackgroundImage,
    videoRef,
  } = useCamera();
  const [popUpIsOpen, setPopUpIsOpen] = useState(true);

  useEffect(() => {
    getSavedBackgroundImage();
  });

  const takeAshot = async () => {
    console.log("takeAshot");

    await takeBackgroundImage();
    openDialog();
  };

  useEffect(() => {
    captureImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    handleCustomStap(1);
  };

  // Save the image to the database
  const handleSaveImage = async () => {
    if (!savedBackgroundImage) return;
    const user = localStorage.getItem("account");
    const plantId = 0;

    const saveImage = async (dataImg: Object) => {
      const userId = user && JSON.parse(user).id;
      const dataStr = JSON.stringify({ ...dataImg, userId, plantId });

      const response = await fetch("/api/saveImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataStr,
      });
      return response.json();
    };
    const res = await saveImage({
      dataImg: savedBackgroundImage,
      userId: 0,
      plantId: 0,
      plantType: "digital",
    });

    handleCustomStap(1);
  };

  const handleBackAction = () => {
    handleCustomStap(1);
  };

  return (
    <>
      <PopUp isOpen={popUpIsOpen} pupUpType="budPopup" backgroundColor="white">
        <p className={$.text}>{texts.cameraNote_1}</p>
        <p className={$.text}>{texts.cameraNote_2}</p>
        <div className={$.buttons}>
          <Button text="Terug" color="brown" onClick={handleBackAction} />

          <Button
            text="Doorgaan"
            color="green"
            onClick={() => setPopUpIsOpen(false)}
          />
        </div>
      </PopUp>

      <Dialog isOpen={isOpen} onClose={closeDialog} title="Image Review">
        <div className={$.dialogContent}>
          <div className={$.backgroundReview}>
            <div
              className={$.backgroundImage}
              style={{
                backgroundImage: `url(${savedBackgroundImage})`,
              }}
            ></div>
          </div>

          <div className={$.dialogButtons}>
            <div className={cs($.dialogButton, $.shotButton)}>
              <Button text="Nieuw schot" color="brown" onClick={closeDialog} />
            </div>
            <div className={cs($.dialogButton, $.useButton)}>
              <Button text="Gebruik" color="green" onClick={handleSaveImage} />
            </div>
          </div>
        </div>
      </Dialog>
      <CameraComponent
        text={texts.backgroundShotNote}
        cameraButton={takeAshot}
        videoRef={videoRef}
        goBack={goBack}
      />
    </>
  );
};

export default CameraPage;
