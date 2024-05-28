import React, { useEffect, useState } from "react";
import Image from "next/image";
import TutorialLayout from "@/src/layouts/tutorialLayout";
import cs from "classnames";
import { PlantPosition, PlantType, careInfo } from "@/ts/types";
import BudPopUp from "@/src/components/BudPopUp/BudPopUp";
import Button from "@/src/components/Button/Button";
import { useAccount } from "@/src/contexts/account/accountContext";
import { useStapper } from "@/src/contexts/tutorialStapper/tutorialStapper";
import $ from "./stap4.module.scss";
import Draggable from "react-draggable";
import { Icon } from "@/src/components/Icon/Icon";
import { Award } from "@/src/components/Award/Award";

interface stapProps {}

const Stap4: React.FC<stapProps> = ({}) => {
  const { account } = useAccount();
  const { handlePreviousStap } = useStapper();
  const [popUpIsOpen, setPopUpIsOpen] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [gaveWater, setGaveWater] = useState<boolean>(false);
  const [showAward, setShowAward] = useState<boolean>(false);
  const [careInfo, setCareInfo] = useState<careInfo>({
    Watering: "",
    amountOfWater: "",
    Light: "",
    Temperature: "",
    Poisoning: "",
    careLevel: "",
  });
  const [savedPlantPosition, setSavedPlantPosition] = useState<PlantPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setSavedPlantPosition(
      JSON.parse(localStorage.getItem("plantPosition") || "{}")
    );

    const database: {
      [key: string]: { plants: PlantType[] };
    } = require("@/data/database.json");

    if (account === undefined) return;
    const userPlants = database[account.id].plants;
    const tutorialPlantIndex = userPlants.findIndex((plant) => plant.id === 0);
    setCareInfo(userPlants[tutorialPlantIndex].careInfo);
  }, []);

  const handleBackButton = () => {
    handlePreviousStap();
  };

  const handelDragWater = (e: any, data: any) => {
    setDragging(true);
    console.log(data.x, data.y);
    setGaveWater(true);
  };

  const handleClaim = () => {
    setShowAward(false);
  };

  return (
    <TutorialLayout>
      {showAward && (
        <Award
          award="potted-plant-smile"
          text="plant pot"
          handleClaim={handleClaim}
        />
      )}

      <BudPopUp isOpen={popUpIsOpen} pupUpType="pupUp" backgroundColor="white">
        <p className={$.text}>
          Je plant heeft{" "}
          <span className={$.greenText}>
            {careInfo.Watering} {careInfo.amountOfWater}
          </span>{" "}
          water nodig.
        </p>
        <p className={$.text}>
          Maar voor jouw digitale plant doen wij het sneller.
        </p>
        <p className={$.text}>
          En maak je geen zorgen, ik ben er altijd om je eraan te herinneren en
          helpen.
        </p>
        <div className={$.popUpButtons}>
          <Button text="Terug" color="brown" onClick={handleBackButton} />

          <Button
            text="Doorgaan"
            color="green"
            onClick={() => setPopUpIsOpen(false)}
          />
        </div>
      </BudPopUp>

      <div
        className={$.stap4}
        style={{
          transform: `translate(${savedPlantPosition.x}px, ${savedPlantPosition.y}px)`,
        }}
      >
        <div className={$.fakePLant}></div>
        <Image
          src="/images/icons/pot-default.svg"
          alt="stap3"
          className={$.potImage}
          layout="fill"
        />

        {gaveWater && (
          <div
            className={cs($.waterIcon, $.waterIconCopy, {
              [$.stopWatering]: !gaveWater,
            })}
            style={{
              transform: `translate(${savedPlantPosition.x}px, ${savedPlantPosition.y}px)`,
            }}
          >
            <Icon icon="watering" />
          </div>
        )}
      </div>

      <Draggable
        axis="both"
        handle=".draggableElement"
        onDrag={handelDragWater}
      >
        <div
          className={cs(
            "draggableElement",
            $.waterIcon,
            {
              [$.toDrag]: !dragging,
            },
            {
              [$.dragging]: dragging,
            }
          )}
        >
          <Icon icon="watering" text="water" />
        </div>
      </Draggable>
    </TutorialLayout>
  );
};

export default Stap4;
