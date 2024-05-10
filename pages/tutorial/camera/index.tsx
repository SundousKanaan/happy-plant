import React, { useEffect, useState } from "react";
import CameraComponent from "@/src/components/CameraComponent/CameraComponent";
import Button from "@/src/components/Button/Button";
import cs from "classnames";
import $ from "./Camera.module.scss";
import { useStepper } from "@/src/hooks/useStepper";
import useCamera from "@/src/hooks/useCamera";

const CameraPage = () => {
  const { setPreviousStep } = useStepper();
  const { getSavedBackgroundImage, savedBackgroundImage } = useCamera();
  const [closeDialog, setCloseDialog] = useState<boolean>(false);
  console.log({ closeDialog });

  useEffect(() => {
    setPreviousStep("/tutorial");
    getSavedBackgroundImage();
  });

  const handleCloseDialog = () => {
    setCloseDialog(true);
  };

  return (
    <section>
      <CameraComponent openReview={closeDialog}>
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
              <Button
                text="Nieuw schot"
                color="brown"
                onClick={handleCloseDialog}
              />
            </div>
            <div className={cs($.dialogButton, $.useButton)}>
              <Button
                text="Gebruik"
                color="green"
                onClick={() => console.log("1")}
              />
            </div>
          </div>
        </div>
      </CameraComponent>
    </section>
  );
};

export default CameraPage;
