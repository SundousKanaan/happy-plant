import React, { useRef, useEffect, useState } from "react";
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
import plantsDatabase from "@/data/plantsDatabase.json";
import Stap1 from "./stap1/stap1";
import Stap2 from "./stap2/stap2";

const Tutorial = () => {
  const router = useRouter();
  const [tutorialStep, setTutorialStep] = useState(0);
  const [isBudCloudOpen, setIsBudCloudOpen] = useState(true);
  const [cloudText, setCloudText] = useState(0);
  const [bg, setBg] = useState("");
  const [openOptionsList, setOpenOptionsList] = useState(false);
  const [disableToTop, setDisableToTop] = useState(true);
  const [disableToBottom, setDisableToBottom] = useState(false);
  const [chosenPlant, setChosenPlant] = useState<string | undefined>();

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
    }
  }, [setBg, database]);

  useEffect(() => {
    // Controleer of localStorage beschikbaar is in de browseromgeving
    if (typeof window !== "undefined") {
      // Haal het huidige opgeslagen stapnummer op uit localStorage
      const savedStep = localStorage.getItem("tutorialStep");
      // Als er een opgeslagen stap is, gebruik deze, anders gebruik de huidige stap
      const initialStep = savedStep ? parseInt(savedStep, 10) : tutorialStep;
      setTutorialStep(initialStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Wanneer de tutorialStep verandert, sla het nieuwe stapnummer op in localStorage
    localStorage.setItem("tutorialStep", tutorialStep.toString());
    setCloudText(tutorialStep);
  }, [tutorialStep]);

  const handleCameraClick = () => {
    router.push("/tutorial/camera");
    setIsBudCloudOpen(false);
  };

  const handelOpenOptionsList = () => {
    if (openOptionsList) {
      setOpenOptionsList(false);
    } else {
      setOpenOptionsList(true);
    }
  };

  const listContainerRef = useRef<HTMLUListElement>(null);
  const scrollToTop = () => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;

      setDisableToTop(true);
      setDisableToBottom(false);
    }
  };

  const scrollToBottom = () => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop =
        listContainerRef.current.scrollHeight;

      setDisableToTop(false);
      setDisableToBottom(true);
    }
  };

  const goToStap3 = (id: number, plantName: string) => {
    setTutorialStep(3);
    setChosenPlant(plantName);
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

      {tutorialStep < 2 && (
        <div className={$.stap1}>
          <Stap1 handleCameraClick={handleCameraClick} />
        </div>
      )}

      {tutorialStep === 2 && (
        <>
          <div className={$.stap2}>
            <Stap2
              handelOpenOptionsList={handelOpenOptionsList}
              openOptionsList={openOptionsList}
            />
          </div>

          {openOptionsList && (
            <section className={$.listContainer}>
              <div className={cs($.arrowButton, $.top)}>
                <Button
                  icon="Arrow"
                  color="transparent"
                  onClick={scrollToTop}
                  disabled={disableToTop}
                />
              </div>
              <div className={cs($.arrowButton, $.bottom)}>
                <Button
                  icon="Arrow"
                  color="transparent"
                  onClick={scrollToBottom}
                  disabled={disableToBottom}
                />
              </div>
              <div className={$.optionsMenu}>
                <ul ref={listContainerRef} className={$.optionsList}>
                  {plantsDatabase.map((plant, index) => (
                    <li key={index} className={$.option}>
                      <Button
                        icon={plant.icon}
                        text={plant.name}
                        color="transparent"
                        onClick={() => goToStap3(plant.id, plant.name)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </>
      )}

      {tutorialStep === 3 && <div className={$.stap3}>test</div>}

      <div className={$.budCloud}>
        <BudCloud
          type="happy"
          text={texts.budCloud(chosenPlant)[cloudText]}
          isOpen={isBudCloudOpen}
        />
      </div>

      <div className={$.actionButtons}>
        <div
          className={cs($.backButton, {
            [$.visible]: tutorialStep > 1,
          })}
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
            disabled={tutorialStep === 2}
          />
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
