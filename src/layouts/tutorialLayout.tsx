import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/src/components/User/User";
import { Icon } from "@/src/components/Icon/Icon";
import { BudCloud } from "@/src/components/BudCloud/BudCloud";
import Button from "@/src/components/Button/Button";
import cs from "classnames";
import $ from "./tutorialLayout.module.scss";
import { useStapper } from "@/src/contexts/tutorialStapper/tutorialStapper";

interface TutorialLayoutProps {
  children: React.ReactNode;
  disabledNext?: boolean;
  cloudText: string;
}

const TutorialLayout: React.FC<TutorialLayoutProps> = ({
  children,
  disabledNext = false,
  cloudText,
}) => {
  const { tutorialStap, handelNexttStap, handelPreviousStap } = useStapper();
  const [disabledNextButton, setDisabledNextButton] = useState(false);

  const [bg, setBg] = useState("");

  const handelNextButton = () => {
    handelNexttStap();
  };

  const handelBackButton = () => {
    handelPreviousStap();
  };

  // get the background image from the local storage
  useEffect(() => {
    const storedBg = localStorage.getItem("backgroundImage");

    if (storedBg) {
      setBg(storedBg);
    }
  }, [bg]);

  return (
    <section className={$.container}>
      <>
        <div className={$.bgContainer}>
          {bg !== "" && (
            <Image
              src={bg}
              alt="background"
              layout="fill"
              className={cs("backgroundPhoto", $.bg)}
              style={{
                objectFit: "cover",
                objectPosition: "bottom",
              }}
            />
          )}
        </div>
        <div className={$.userContainer}>
          <User />
        </div>
        <div className={$.sittingsContainer}>
          <Icon icon="settings" />
        </div>
      </>

      {children}

      <>
        <span className={cs($.budCloud)}>
          <BudCloud type="happy" text={cloudText} isOpen />
        </span>
        <div className={$.actionButtons}>
          <div
            className={cs($.backButton, {
              [$.visible]: tutorialStap > 1 && tutorialStap < 5,
            })}
          >
            <Button text="Terug" color="brown" onClick={handelBackButton} />
          </div>

          <div className={$.nextButton}>
            <Button
              text="Volgende"
              color="green"
              onClick={handelNextButton}
              disabled={disabledNextButton || disabledNext}
            />
          </div>
        </div>
      </>
    </section>
  );
};

export default TutorialLayout;
