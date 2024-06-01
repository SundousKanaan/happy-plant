import React from "react";
import { Bud } from "../Bud/Bud";
import cs from "classnames";
import $ from "./PopUp.module.scss";
import Button from "@/src/components/Button/Button";

interface PopUpProps {
  isOpen?: boolean;
  children?: React.ReactNode;
  buttonsChildren?: React.ReactNode;
  pupUpType: "budPopup" | "page" | "addPlant";
  title?: string;
  backgroundColor?: "white" | "brown";
  ClosePopUp?: () => void;
}

const PopUp: React.FC<PopUpProps> = ({
  children,
  buttonsChildren,
  isOpen,
  pupUpType,
  title,
  backgroundColor,
  ClosePopUp,
}) => {
  return (
    <section
      className={cs(
        $.container,
        {
          [$.pageStyle]: pupUpType === "page" && title,
        },
        { [$.visible]: isOpen }
      )}
    >
      {pupUpType === "budPopup" && (
        <>
          <div className={$.pupUpContent}>{children}</div>
          <div className={$.image}>
            <Bud type="happy" />
          </div>
        </>
      )}

      {pupUpType === "page" && (
        <>
          <h2 className={$.title}>{title}</h2>
          <div className={$.backButton}>
            <Button icon="Xsignal" color="transparent" onClick={ClosePopUp} />
          </div>

          <div
            className={cs($.pageContent, {
              [$.white]: backgroundColor === "white",
              [$.brown]: backgroundColor === "brown",
            })}
          >
            {children}
          </div>
          <div className={$.buttonsContainer}>{buttonsChildren}</div>
        </>
      )}
    </section>
  );
};

export default PopUp;
