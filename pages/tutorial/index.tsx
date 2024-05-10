import React, { use, useEffect, useState } from "react";
import $ from "./Tutorial.module.scss";
import Image from "next/image";
import { User } from "@/src/components/User/User";
import { Icon } from "@/src/components/Icon/Icon";
import { useRouter } from "next/router";
import { BudCloud } from "@/src/components/BudCloud/BudCloud";
import Button from "@/src/components/Button/Button";
import cs from "classnames";

const Tutorial = () => {
  const router = useRouter();
  const [tutorialStep, setTutorialStep] = useState(0);
  const [isBudCloudOpen, setIsBudCloudOpen] = useState(true);
  const [cloudText, setCloudText] = useState("");
  const bg = "/images/test.svg";

  const handleCloudText = () => {
    setCloudText("Laat ons eerst jouw zorglocatie kiezen!");
  };

  useEffect(() => {
    handleCloudText();
  }, []);

  const handleCameraClick = () => {
    router.push("/tutorial/camera");
    setIsBudCloudOpen(false);
  };

  return (
    <section className={$.container}>
      <div className={$.bgContainer}>
        <Image src={bg} alt="background" layout="fill" className={$.bg} />
      </div>
      <div className={$.userContainer}>
        <User />
      </div>
      <div className={$.sittingsContainer}>
        <Icon icon="settings" />
      </div>
      {tutorialStep === 0 && (
        <>
          <ul className={$.iconsList}>
            <li className={$.icon}>
              <button className={$.iconButton} onClick={handleCameraClick}>
                <Icon icon="camera" text="Mijn kamer" />
              </button>
            </li>
            <li className={$.icon}>
              <button className={$.iconButton}>
                <Icon icon="camera" text="Slaapkamer" />
              </button>
            </li>
            <li className={$.icon}>
              <button className={$.iconButton}>
                <Icon icon="camera" text="Woonkamer" />
              </button>
            </li>
          </ul>
        </>
      )}

      <div className={$.budCloud}>
        <BudCloud type="happy" text={cloudText} isOpen={isBudCloudOpen} />
      </div>

      <div className={$.actionButtons}>
        <div
          className={cs($.backButton, { [$.invisible]: tutorialStep === 0 })}
        >
          <Button
            text="Terug"
            color="brown"
            onClick={() => setTutorialStep(tutorialStep - 1)}
          />
        </div>

        <div className={$.nextButton}>
          <Button
            text="Volgende"
            color="green"
            onClick={() => setTutorialStep(tutorialStep + 1)}
          />
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
