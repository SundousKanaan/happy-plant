// CameraComponent.tsx
import React, { useEffect } from "react";
import $ from "./CameraComponent.module.scss";
import Button from "@/src/components/Button/Button";
import cs from "classnames";

interface CameraComponentProps {
  plantCheck?: boolean;
  correctsignDisabled?: boolean;
  cameraButtonDisabled?: boolean;
  children?: React.ReactNode;
  text: string;
  cameraButton?: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  goBack?: () => void;
  handelCorrectsignClick?: () => void;
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
  handelCorrectsignClick,
}) => {
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
                onClick={handelCorrectsignClick}
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
