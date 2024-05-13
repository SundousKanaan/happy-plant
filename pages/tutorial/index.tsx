import React, { use, useEffect, useState } from "react";
import $ from "./Tutorial.module.scss";
import Image from "next/image";
import { User } from "@/src/components/User/User";
import { Icon } from "@/src/components/Icon/Icon";
import { useRouter } from "next/router";
import { BudCloud } from "@/src/components/BudCloud/BudCloud";
import Button from "@/src/components/Button/Button";
import cs from "classnames";
import { PlantType } from "@/ts/types";
import texts from "@/ts/texts";

const Tutorial = () => {
  const router = useRouter();
  const [tutorialStep, setTutorialStep] = useState(0);
  const [isBudCloudOpen, setIsBudCloudOpen] = useState(true);
  const [cloudText, setCloudText] = useState(0);
  const [bg, setBg] = useState("");
  const storedStep =
    typeof window !== "undefined" && localStorage.getItem("tutorialStep");

  const database: {
    [key: string]: { plants: PlantType[] };
  } = require("@/data/database.json");
  useEffect(() => {
    const user =
      typeof window !== "undefined" && localStorage.getItem("account");
    const userId = user && JSON.parse(user).id;
    const tutorialPlant: PlantType | undefined = database[userId]?.plants.find(
      (plant) => plant.id === 0
    );
    if (tutorialPlant) {
      setBg(`/images/camera/${tutorialPlant.backgroundImage}`);
      setTutorialStep(1);
    }
  }, [setBg, database]);

  useEffect(() => {
    localStorage.setItem("tutorialStep", tutorialStep.toString());
  }, [tutorialStep]);

  console.log({ tutorialStep });

  const handleCloudText = () => {
    setCloudText(tutorialStep);
  };

  useEffect(() => {
    handleCloudText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCameraClick = () => {
    router.push("/tutorial/camera");

    setIsBudCloudOpen(false);
  };

  return (
    <section className={$.container}>
      <div className={$.bgContainer}>
        {bg !== "" && (
          <Image
            src={bg}
            alt="background"
            layout="fill"
            className={$.bg}
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
      {(tutorialStep === 0 || tutorialStep === 1) && (
        <>
          <ul className={$.iconsList}>
            <li className={$.icon}>
              <button className={$.iconButton} onClick={handleCameraClick}>
                <Icon icon="camera" text="Mijn kamer" />
              </button>
            </li>
            <li className={$.icon}>
              <button className={$.iconButton}>
                <Icon bg="bedroom" text="Slaapkamer" />
              </button>
            </li>
            <li className={$.icon}>
              <button className={$.iconButton}>
                <Icon bg="livingroom" text="Woonkamer" />
              </button>
            </li>
          </ul>
        </>
      )}

      {tutorialStep === 2 && (
        <>
          <ul className={$.iconsList}>
            <li className={$.icon}>
              <button className={$.iconButton} onClick={handleCameraClick}>
                <Icon icon="flower" text="Bloemen" />
              </button>
            </li>
            <li className={$.icon}>
              <button className={$.iconButton}>
                <Icon icon="Leafyplant" text="Bladplanten" />
              </button>
            </li>
            <li className={$.icon}>
              <button className={$.iconButton}>
                <Icon icon="succulent" text="Vetplanten" />
              </button>
            </li>
          </ul>
        </>
      )}

      <div className={$.budCloud}>
        <BudCloud
          type="happy"
          text={texts.budCloud()[cloudText]}
          isOpen={isBudCloudOpen}
        />
      </div>

      <div className={$.actionButtons}>
        <div className={cs($.backButton, { [$.visible]: tutorialStep === 2 })}>
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
