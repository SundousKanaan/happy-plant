import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/src/components/User/User";
import { Icon } from "@/src/components/Icon/Icon";
import { BudCloud } from "@/src/components/BudCloud/BudCloud";
import Button from "@/src/components/Button/Button";
import cs from "classnames";
import $ from "./tutorialLayout.module.scss";
import texts from "@/ts/texts";
import { useStapper } from "@/src/contexts/tutorialStapper/tutorialStapper";

interface TutorialLayoutProps {
  children: React.ReactNode;
}

const TutorialLayout: React.FC<TutorialLayoutProps> = ({ children }) => {
  const {
    tutorialStap,
    handleNexttStap,
    handlePreviousStap,
    disabledNextButton,
  } = useStapper();

  const [bg, setBg] = useState("");
  const [cloudText, setCloudText] = useState(0);

  const handelNextButton = () => {
    handleNexttStap();

    // if (cloudText === 3) {
    //   setCloudText(6);
    // }
  };

  const handleBackButton = () => {
    handlePreviousStap();
  };

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
          <BudCloud
            type="happy"
            // text={texts.budCloud(chosenPlant)[cloudText]}
            text="test text"
            isOpen
          />
        </span>

        <div className={$.actionButtons}>
          <div
            className={cs($.backButton, {
              [$.visible]: tutorialStap > 1,
            })}
          >
            <Button text="Terug" color="brown" onClick={handleBackButton} />
          </div>

          <div className={$.nextButton}>
            <Button
              text="Volgende"
              color="green"
              onClick={handelNextButton}
              disabled={disabledNextButton}
            />
          </div>
        </div>
      </>
    </section>
  );
};

export default TutorialLayout;
