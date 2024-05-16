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
import Draggable from "react-draggable";

import Stap1 from "./stap1/stap1";
import Stap2 from "./stap2/stap2";
import Stap3 from "./stap3/stap3";

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
  const [checkingResult, setCheckingResult] = useState<number>();
  const [isDragging, setIsDragging] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(
    tutorialStep === 2 || tutorialStep === 3
  );

  const database: {
    [key: string]: { plants: PlantType[] };
  } = require("@/data/database.json");

  const handleBackButton = () => {
    setTutorialStep(tutorialStep - 1);
    setCheckingResult(undefined);
    setIsDragging(false);
  };

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
      if (initialStep !== tutorialStep) {
        handleCloudText(initialStep);
      }
    }
  });

  useEffect(() => {
    // Wanneer de tutorialStep verandert, sla het nieuwe stapnummer op in localStorage
    localStorage.setItem("tutorialStep", tutorialStep.toString());
  }, [tutorialStep]);

  useEffect(() => {
    handleCloudText(tutorialStep);
  }, [tutorialStep]);

  const handleCloudText = (step: number) => {
    setCloudText(step);
    setTutorialStep(step);
  };

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

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const BackgroundCheck = require("../api/background-check.js");

  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const defaultPosition = {
    x: (windowSize.width - parseFloat("160px")) / 2,
    y: (windowSize.height - parseFloat("160px")) / 2,
  };

  const handelDrag = (e: any, data: any) => {
    setIsDragging(true);
    console.log(data.x, data.y);
    BackgroundCheck.init({
      targets: ".braggableElement",
      images: ".backgroundPhoto",
      lightFunction: lightFunction,
      darkFunction: darkFunction,
    });

    BackgroundCheck.refresh();
  };

  const lightFunction = (mean: any) => {
    let Lighting = mean.toFixed(2);
    const percentage = (Lighting * 100).toFixed(0);

    setCheckingResult(Number(percentage));
    setNextButtonDisabled(false);
  };

  const darkFunction = (mean: any) => {
    let Darkness = mean.toFixed(2);
    const percentage = (Darkness * 100).toFixed(0);
    setCheckingResult(Number(percentage));
    setNextButtonDisabled(true);
  };

  const handleRoomSelect = (room: string) => {
    if (room === "livingroom") {
      setBg("/images/livingroom.jpg");
    } else if (room === "bedroom") {
      setBg("/images/bedroom.jpg");
    }
  };

  return (
    <section className={$.container}>
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

      {tutorialStep < 2 && (
        <div className={$.stap1}>
          <Stap1
            handleCameraClick={handleCameraClick}
            onRoomSelect={handleRoomSelect}
          />
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

      {tutorialStep >= 3 && (
        <Draggable
          axis="both"
          defaultPosition={defaultPosition}
          handle=".braggableElement"
          onDrag={handelDrag}
        >
          <div
            className={cs("braggableElement", $.stap3, {
              [$.stopMoving]: isDragging,
            })}
          >
            {checkingResult && isDragging && (
              <div
                className={cs($.procent, {
                  [$.good]: checkingResult >= 50,
                  [$.bad]: checkingResult < 50,
                })}
              >
                {checkingResult}%
              </div>
            )}
            <Stap3 />
          </div>
        </Draggable>
      )}

      <div className={cs($.budCloud, $.hide)}>
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
          <Button text="Terug" color="brown" onClick={handleBackButton} />
        </div>

        <div className={$.nextButton}>
          <Button
            text="Volgende"
            color="green"
            onClick={() => setTutorialStep(tutorialStep + 1)}
            disabled={nextButtonDisabled}
          />
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
