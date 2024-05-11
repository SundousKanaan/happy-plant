// CameraPage.tsx
import React, { useEffect, useState } from "react";
import CameraComponent from "@/src/components/CameraComponent/CameraComponent";
import Button from "@/src/components/Button/Button";
import cs from "classnames";
import $ from "./Camera.module.scss";
import { useStepper } from "@/src/hooks/useStepper";
import useCamera from "@/src/hooks/useCamera";
import { useDialog } from "@/src/contexts/dialogContext/dialogContext";

const CameraPage = () => {
  const { setPreviousStep } = useStepper();
  const { getSavedBackgroundImage, savedBackgroundImage } = useCamera();
  const { closeDialog } = useDialog();

  useEffect(() => {
    setPreviousStep("/tutorial");
    getSavedBackgroundImage();
  });

  const handleSaveImage = async () => {
    if (!savedBackgroundImage) return;
    const saveImage = async (dataImg: Object) => {
      const id = 0;
      const dataStr = JSON.stringify({ ...dataImg, id });
      const response = await fetch("/api/saveImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataStr,
      });
      return response.json();
    };
    const res = await saveImage({ dataImg: savedBackgroundImage });
  };

  return (
    <section>
      <CameraComponent>
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
            {/* close dialog button */}
            <div className={cs($.dialogButton, $.shotButton)}>
              <Button text="Nieuw schot" color="brown" onClick={closeDialog} />
            </div>
            <div className={cs($.dialogButton, $.useButton)}>
              <Button text="Gebruik" color="green" onClick={handleSaveImage} />
            </div>
          </div>
        </div>
      </CameraComponent>
    </section>
  );
};

export default CameraPage;
