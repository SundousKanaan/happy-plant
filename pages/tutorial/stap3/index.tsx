import React, { useEffect, useState } from "react";
import Image from "next/image";
import TutorialLayout from "@/src/layouts/tutorialLayout";
import cs from "classnames";
import $ from "./stap3.module.scss";
import Draggable from "react-draggable";
import { useStapper } from "@/src/contexts/tutorialStapper/tutorialStapper";
import { useAccount } from "@/src/contexts/account/accountContext";
import { PlantType } from "@/ts/types";

interface stapProps {}

const Stap3: React.FC<stapProps> = ({}) => {
  const { account } = useAccount();
  const database: {
    [key: string]: { plants: PlantType[] };
  } = require("@/data/database.json");
  const BackgroundCheck = require("@/pages/api/background-check.js");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [plantPosition, setPlantPosition] = useState({ x: 0, y: 0 });
  const [plantPositionCheck, setPlantPositionCheck] = useState<number>();
  const [disabledNextButton, setDisabledNextButton] = useState(true);
  const [chosenPlant, setChosenPlant] = useState<string | undefined>();
  const [textCloud, setTextCloud] = useState("");

  const handelResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  const handelDrag = (e: any, data: any) => {
    setIsDragging(true);
    BackgroundCheck.init({
      targets: ".draggableElement",
      images: ".backgroundPhoto",
      lightFunction: lightFunction,
      darkFunction: darkFunction,
    });

    setPlantPosition({ x: data.x, y: data.y });

    BackgroundCheck.refresh();
  };
  const lightFunction = (mean: any) => {
    setTextCloud("Deze plek is Goed voor je plant.");

    let Lighting = mean.toFixed(2);
    const percentage = (Lighting * 100).toFixed(0);

    setPlantPositionCheck(Number(percentage));
    setDisabledNextButton(false);

    const userId = account?.id;
    if (userId === undefined) return;
    const userPlants = database[userId].plants;
    const tutorialPlantIndex = userPlants.findIndex((plant) => plant.id === 0);
    if (tutorialPlantIndex !== -1) {
      userPlants[tutorialPlantIndex].position = plantPosition;
    }
  };

  const darkFunction = (mean: any) => {
    setTextCloud("Deze plek is Slecht voor je plant.");
    let Darkness = mean.toFixed(2);
    const percentage = (Darkness * 100).toFixed(0);
    setPlantPositionCheck(Number(percentage));
    setDisabledNextButton(true);
  };

  useEffect(() => {
    const chosenPlant = localStorage.getItem("chosenPlant");
    if (!chosenPlant) return;
    setChosenPlant(chosenPlant);
    setTextCloud(
      `Je schattige plant heet "${chosenPlant}" en heeft gedeeltelijke zon (max 3 tot 4 uur) nodig! Trek je plant en kijk waar hij het beste staat`
    );
  }, []);

  useEffect(() => {
    handelResize();
    console.log({ plantPositionCheck });

    window.addEventListener("resize", handelResize);
    handelResize();

    return () => window.removeEventListener("resize", handelResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("plantPosition", JSON.stringify(plantPosition));
  }, [plantPosition]);

  return (
    <TutorialLayout disabledNext={disabledNextButton} cloudText={textCloud}>
      <Draggable axis="both" handle=".draggableElement" onDrag={handelDrag}>
        <div
          className={cs("draggableElement", $.stap3, {
            [$.notMoving]: !isDragging,
          })}
        >
          {plantPositionCheck && isDragging && (
            <div
              className={cs($.procent, {
                [$.good]: plantPositionCheck >= 50,
                [$.bad]: plantPositionCheck < 50,
              })}
            >
              {plantPositionCheck}%
            </div>
          )}
          <div className={$.fakePLant}></div>
          <Image
            src="/images/icons/pot-default.svg"
            alt="stap3"
            className={$.potImage}
            layout="fill"
          />
        </div>
      </Draggable>
    </TutorialLayout>
  );
};

export default Stap3;
