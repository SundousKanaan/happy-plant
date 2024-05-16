import React, { useRef, useEffect, useState, use } from "react";
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
import { useAccount } from "@/src/contexts/account/accountContext";

import Stap1 from "./stap1/stap1";
import Stap2 from "./stap2/stap2";
import Stap3 from "./stap3/stap3";

const Tutorial = () => {
  const router = useRouter();
  const { account } = useAccount();
  const userId = account?.id;

  const [tutorialStap, setTutorialStap] = useState(1);
  // const [isBudCloudOpen, setIsBudCloudOpen] = useState(true);
  const [cloudText, setCloudText] = useState(0);
  const [bg, setBg] = useState("");
  const [openOptionsList, setOpenOptionsList] = useState(false);
  const [disableToTop, setDisableToTop] = useState(true);
  const [disableToBottom, setDisableToBottom] = useState(false);
  const [chosenPlant, setChosenPlant] = useState<string | undefined>();
  const [checkingResult, setCheckingResult] = useState<number>();
  const [isDragging, setIsDragging] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>();
  const [plantPosition, setPlantPosition] = useState({ x: 0, y: 0 });

  const database: {
    [key: string]: { plants: PlantType[] };
  } = require("@/data/database.json");

  const handleBackButton = () => {
    setTutorialStap(tutorialStap - 1);
    setCheckingResult(undefined);
    setIsDragging(false);
  };

  const handelNextButton = () => {
    setTutorialStap(tutorialStap + 1);

    if (cloudText === 3) {
      setCloudText(6);
    }
  };

  const handleRoomSelect = (room: string) => {
    setBg(`/images/camera/${room}.jpg`);
  };

  useEffect(() => {
    const storedBg = localStorage.getItem("backgroundImage");

    if (storedBg) {
      setBg(storedBg);
    }
  }, [setBg, setTutorialStap]);

  const handleCloudText = (stap: number) => {
    setCloudText(stap);
    setTutorialStap(stap);
  };

  useEffect(() => {
    // Controleer of localStorage beschikbaar is in de browseromgeving
    if (typeof window !== "undefined") {
      // Haal het huidige opgeslagen stapnummer op uit localStorage
      const savedStap = localStorage.getItem("tutorialStap");

      // Als er een opgeslagen stap is, gebruik deze, anders gebruik de huidige stap
      const initialStap = savedStap ? parseInt(savedStap, 10) : tutorialStap;

      if (initialStap !== tutorialStap) {
        handleCloudText(initialStap);
      }
    }
  });

  // const updateSelectedBgInDatabase = async (bg: string) => {
  //   if (userId === undefined) return;
  //   const userPlants = database[userId].plants;

  //   const tutorialPlantIndex = userPlants.findIndex((plant) => plant.id === 0);
  //   if (tutorialPlantIndex !== -1) {
  //     console.log("Tutorial plant found", bg);

  //     userPlants[tutorialPlantIndex].backgroundImage = bg;
  //   } else {
  //     console.log("No tutorial plant found");
  //     userPlants.push({
  //       id: 0,
  //       plantName: "",
  //       type: "",
  //       familyName: "",
  //       plantImage: "",
  //       backgroundImage: `${bg}`,
  //       note: "",
  //       careInfo: {
  //         Watering: "",
  //         Light: "",
  //         Temperature: "",
  //         Poisoning: "",
  //         careLevel: "",
  //       },
  //       position: {
  //         x: 0,
  //         y: 0,
  //       },
  //       birthday: "",
  //     });
  //     const updatedData = JSON.stringify(database, null, 2);

  //     const saveData = async (updatedData: string) => {
  //       console.log({ updatedData });

  //       const response = await fetch("/api/saveData", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: updatedData,
  //       });
  //     };

  //     await saveData(updatedData);
  //   }
  // };

  // useEffect(() => {
  //   if (bg) {
  //     updateSelectedBgInDatabase(bg);
  //   }
  // }, [bg]);

  useEffect(() => {
    // Wanneer de tutorialStap verandert, sla het nieuwe stapnummer op in localStorage
    localStorage.setItem("tutorialStap", tutorialStap.toString());
    if (tutorialStap === 2 || tutorialStap === 3) {
      setNextButtonDisabled(true);
    } else {
      setNextButtonDisabled(false);
    }

    console.log({ tutorialStap });
  }, [tutorialStap]);

  useEffect(() => {
    handleCloudText(tutorialStap);
  }, [tutorialStap, plantPosition]);

  const handleCameraClick = () => {
    router.push("/tutorial/camera");
    // setIsBudCloudOpen(false);
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

  const goToStap3 = (plant: any) => {
    setChosenPlant(plant.name);

    // update de database met de nieuwe plant data van de plant met id 0
    if (userId === undefined) return;
    const userPlants = database[userId].plants;
    const tutorialPlantIndex = userPlants.findIndex((plant) => plant.id === 0);
    if (tutorialPlantIndex !== -1) {
      userPlants[tutorialPlantIndex].databaseId = plant.id;
      userPlants[tutorialPlantIndex].plantName = plant.name;
      userPlants[tutorialPlantIndex].familyName = plant.family;
      userPlants[tutorialPlantIndex].type = plant.type;
      userPlants[tutorialPlantIndex].careInfo.Watering = plant.water;
      userPlants[tutorialPlantIndex].careInfo.Light = plant.light;
      userPlants[tutorialPlantIndex].careInfo.Temperature = plant.temperature;
      userPlants[tutorialPlantIndex].careInfo.Poisoning = plant.toxicityto;
      userPlants[tutorialPlantIndex].careInfo.careLevel = plant.careLevel;
      userPlants[tutorialPlantIndex].position = plantPosition;

      const updatedData = JSON.stringify(database, null, 2);

      const saveData = async (updatedData: string) => {
        const response = await fetch("/api/saveData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: updatedData,
        });
      };

      saveData(updatedData);
    }
    setTutorialStap(3);
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
    BackgroundCheck.init({
      targets: ".braggableElement",
      images: ".backgroundPhoto",
      lightFunction: lightFunction,
      darkFunction: darkFunction,
    });

    setPlantPosition({ x: data.x, y: data.y });
    BackgroundCheck.refresh();
  };

  const lightFunction = (mean: any) => {
    let Lighting = mean.toFixed(2);
    const percentage = (Lighting * 100).toFixed(0);

    setCheckingResult(Number(percentage));
    setNextButtonDisabled(false);
    setCloudText(4);
  };

  const darkFunction = (mean: any) => {
    let Darkness = mean.toFixed(2);
    const percentage = (Darkness * 100).toFixed(0);
    setCheckingResult(Number(percentage));
    setNextButtonDisabled(true);
    setCloudText(5);
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

      {tutorialStap === 1 && (
        <div className={$.stap1}>
          <Stap1
            handleCameraClick={handleCameraClick}
            onRoomSelect={handleRoomSelect}
          />
        </div>
      )}

      {tutorialStap === 2 && (
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
                        onClick={() => goToStap3(plant)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </>
      )}

      {tutorialStap === 3 && (
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

      {tutorialStap === 4 && (
        // get the plant position from the database
        <div
          className={$.stap4}
          style={{
            position: "absolute",
            top: plantPosition.y,
            left: plantPosition.x,
          }}
        >
          <Stap3 />
        </div>
      )}

      {/* $.hide */}
      <span className={cs($.budCloud)}>
        <BudCloud
          type="happy"
          text={texts.budCloud(chosenPlant)[cloudText]}
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
            disabled={nextButtonDisabled}
          />
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
