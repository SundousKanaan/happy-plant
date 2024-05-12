import React from "react";
import { Bud } from "../Bud/Bud";
import cs from "classnames";
import $ from "./BudPopUp.module.scss";
import Button from "@/src/components/Button/Button";

interface BudPopUpProps {
  isOpen?: boolean;
  children?: React.ReactNode;
  buttonsChildren?: React.ReactNode;
  pupUpType: "pupUp" | "page" | "addPlant";
  title?: string;
  backgroundColor?: "white" | "brown";
}

const BudPopUp: React.FC<BudPopUpProps> = ({
  children,
  buttonsChildren,
  isOpen = true,
  pupUpType,
  title,
  backgroundColor,
}) => {
  return (
    <section
      className={cs($.container, {
        [$.pageStyle]: pupUpType === "page" && title,
      })}
    >
      {pupUpType === "pupUp" && (
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
          {/* TODO: add back button */}
          <div className={$.backButton}>
            <Button
              icon="Xsignal"
              color="transparent"
              onClick={() => console.log("back")}
            />
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

export default BudPopUp;
