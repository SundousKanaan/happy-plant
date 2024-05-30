// CameraComponent.tsx
import React, { useEffect } from "react";
import useCamera from "@/src/hooks/useCamera";
import $ from "./CameraComponent.module.scss";
import Button from "@/src/components/Button/Button";
import cs from "classnames";
import Dialog from "../Dialog/Dialog";
import { useRouter } from "next/router";
import { useStapper } from "@/src/contexts/tutorialStapper/tutorialStapper";
import { useDialog } from "@/src/contexts/dialogContext/dialogContext";

interface CameraComponentProps {
  plantCheck?: boolean;
  correctsignDisabled?: boolean;
  cameraButtonDisabled?: boolean;
  children?: React.ReactNode;
  text: string;
  cameraButton?: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  goBack?: () => void;
  handleCorrectsignClick?: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  plantCheck = false,
  children,
  text,
  correctsignDisabled = true,
  cameraButtonDisabled = false,
  cameraButton,
  videoRef,
  goBack,
  handleCorrectsignClick,
}) => {
  const router = useRouter();
  const { handleCustomStap } = useStapper();

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
              onClick={cameraButton}
              disabled={cameraButtonDisabled}
            />
          </div>
          {plantCheck && (
            <div className={cs($.button, $.correctsign)}>
              <Button
                icon="correctsign"
                color="transparent"
                onClick={handleCorrectsignClick}
                disabled={correctsignDisabled}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CameraComponent;
