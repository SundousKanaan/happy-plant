// CameraComponent.tsx
import React, { useEffect } from "react";
import useCamera from "@/src/hooks/useCamera";
import $ from "./CameraComponent.module.scss";
import Button from "@/src/components/Button/Button";
import cs from "classnames";
import Dialog from "../Dialog/Dialog";
import { useRouter } from "next/router";
import { useStepper } from "@/src/hooks/useStepper";
import { useDialog } from "@/src/contexts/dialogContext/dialogContext";

interface CameraComponentProps {
  plantCheck?: boolean;
  children?: React.ReactNode;
  text: string;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  plantCheck = false,
  children,
  text,
}) => {
  const router = useRouter();
  const { savedpreviousStep, getSavedpreviousStep } = useStepper();
  const { captureImage, takeBackgroundImage, videoRef } = useCamera();
  const { openDialog, closeDialog, isOpen } = useDialog();

  useEffect(() => {
    getSavedpreviousStep();
    captureImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const takeAshot = async () => {
    await takeBackgroundImage();
    openDialog();
  };

  const goBack = () => {
    if (!savedpreviousStep) return;
    router.push(savedpreviousStep);
  };

  return (
    <>
      <div className={$.streamContainer}>
        <video ref={videoRef} autoPlay playsInline className={$.video} />
        <div className={$.noteContainer}>
          <p className={$.noteText}>{text}</p>
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

      <Dialog isOpen={isOpen} onClose={closeDialog} title="Image Review">
        {children}
      </Dialog>
    </>
  );
};

export default CameraComponent;
