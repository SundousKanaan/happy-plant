// CameraComponent.tsx
import React, { Children, useEffect, useState } from "react";
import useCamera from "@/src/hooks/useCamera";
import $ from "./CameraComponent.module.scss";
import Button from "@/src/components/Button/Button";
import cs from "classnames";
import Dialog from "../Dialog/Dialog";
import { useRouter } from "next/router";
import { useStepper } from "@/src/hooks/useStepper";

interface CameraComponentProps {
  plantCheck?: boolean;
  children?: React.ReactNode;
  openReview: boolean;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  plantCheck = false,
  children,
  openReview = true,
}) => {
  const router = useRouter();
  const { savedpreviousStep, getSavedpreviousStep } = useStepper();

  const { captureImage, takeBackgroundImage, videoRef } = useCamera();
  useEffect(() => {
    captureImage();
  }, [captureImage]);

  const takeAshot = async () => {
    await takeBackgroundImage();
    openReview = true;
    console.log({ openReview });
  };

  const goBack = () => {
    getSavedpreviousStep();
    if (!savedpreviousStep) return;
    router.push(savedpreviousStep);
  };

  return (
    <>
      <div className={$.streamContainer}>
        <video ref={videoRef} autoPlay playsInline className={$.video} />
        <div className={$.noteContainer}>
          <p className={$.noteText}>
            Maak een foto van het kamer waar je jouw plant wil verzorgen
          </p>
        </div>
        <div className={$.buttonsContainer}>
          <div className={cs($.button, $.X)}>
            <Button icon="Xsignal" color="transparent" onClick={goBack} />
          </div>
          <div className={cs($.button, $.takePhoto)}>
            <Button
              icon="cameraButton"
              color="transparent"
              onClick={takeAshot}
            />
          </div>
          {plantCheck && (
            <div className={cs($.button, $.correctsign)}>
              <Button
                icon="correctsign"
                color="transparent"
                onClick={() => console.log("correctsign")}
              />
            </div>
          )}
        </div>
      </div>
      {/* {openReview && ( */}
      <Dialog
        isOpen
        onClose={() => console.log({ openReview })}
        title="Image Review"
      >
        {children}
      </Dialog>
      {/* )} */}
    </>
  );
};

export default CameraComponent;
