import React, { useEffect, useState } from "react";
import Image from "next/image";
import TutorialLayout from "@/src/layouts/tutorialLayout";
import cs from "classnames";
import { PlantPosition, PlantType, careInfo } from "@/ts/types";
import PopUp from "@/src/components/PopUp/PopUp";
import Button from "@/src/components/Button/Button";
import { useAccount } from "@/src/contexts/account/accountContext";
import { useStapper } from "@/src/contexts/tutorialStapper/tutorialStapper";
import $ from "./stap4.module.scss";
import Draggable from "react-draggable";
import { Icon } from "@/src/components/Icon/Icon";
import { Award } from "@/src/components/Award/Award";
import { useRouter } from "next/router";

interface stapProps {}

const Stap4: React.FC<stapProps> = ({}) => {
  const router = useRouter();
  const { account } = useAccount();
  const { handlePreviousStap, showAward } = useStapper();
  const [popUpIsOpen, setPopUpIsOpen] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragStoped, setDragStoped] = useState<boolean>(false);
  const [gaveWater, setGaveWater] = useState<boolean>(false);
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
  const [textCloud, setTextCloud] = useState(
    "Laten we jouw plant nu voor het eerst keer water geven!"
  );
  const [disabledNextButton, setDisabledNextButton] = useState(true);

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
  };

  const handelStopDragWater = () => {
    setGaveWater(true);
    setDragStoped(true);
    setTextCloud(
      "Je zaden beginnen te groeien, gefeliciteerd! Morgen moeten we weer water geven."
    );
  };

  const handleClaim = () => {
    router.push("/homePage");
  };

  // set timer to setGaveWater false after 5 seconds
  useEffect(() => {
    if (!gaveWater) return;
    const timer = setTimeout(() => {
      setGaveWater(false);
      setDisabledNextButton(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [gaveWater]);

  return (
    <TutorialLayout disabledNext={disabledNextButton} cloudText={textCloud}>
      {showAward && (
        <Award
          award="potted-plant-smile"
          text="plant pot"
          handleClaim={handleClaim}
        />
      )}

      <PopUp isOpen={popUpIsOpen} pupUpType="budPopup" backgroundColor="white">
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
      </PopUp>

      <div
        className={$.stap4}
        style={{
          transform: `translate(${savedPlantPosition.x}px, ${savedPlantPosition.y}px)`,
        }}
      >
        <div className={cs($.fakePLant, { [$.grow]: dragStoped })}>
          <div className={cs($.leafRight, { [$.grow]: dragStoped })}></div>
          <div className={cs($.leafLeft, { [$.grow]: dragStoped })}></div>
        </div>
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
        onStop={handelStopDragWater}
      >
        <div
          className={cs(
            "draggableElement",
            $.waterIcon,
            {
              [$.toDrag]: !dragging,
            },
            { [$.stopDrag]: dragStoped }
          )}
        >
          <Icon icon="watering" text="water" />
        </div>
      </Draggable>
    </TutorialLayout>
  );
};

export default Stap4;
