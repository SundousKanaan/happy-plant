import React, { useEffect, useState } from "react";
import CameraComponent from "@/src/components/CameraComponent/CameraComponent";
import Button from "@/src/components/Button/Button";
import cs from "classnames";
import { useStepper } from "@/src/hooks/useStepper";
import useCamera from "@/src/hooks/useCamera";
import { useDialog } from "@/src/contexts/dialogContext/dialogContext";
import BudPopUp from "@/src/components/BudPopUp/BudPopUp";
import texts from "@/ts/texts";
import $ from "./Camera.module.scss";
import { useRouter } from "next/router";

const CameraPage = () => {
  const router = useRouter();
  const { setPreviousStep, savedpreviousStep, getSavedpreviousStep } =
    useStepper();
  const { getSavedBackgroundImage, savedBackgroundImage } = useCamera();
  const { closeDialog } = useDialog();
  const [popUpIsOpen, setPopUpIsOpen] = useState(true);

  useEffect(() => {
    setPreviousStep("/tutorial");
    getSavedpreviousStep();
    getSavedBackgroundImage();
  });

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
    });

    if (!savedpreviousStep) return;
    router.push(savedpreviousStep);
  };

  const handleBackAction = () => {
    if (!savedpreviousStep) return;
    router.push(savedpreviousStep);
  };

  return (
    <>
      <BudPopUp isOpen={popUpIsOpen} pupUpType="pupUp" backgroundColor="white">
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
      </BudPopUp>

      <CameraComponent text={texts.backgroundShotNote}>
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
      </CameraComponent>
    </>
  );
};

export default CameraPage;
