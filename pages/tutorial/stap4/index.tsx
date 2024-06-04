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
  const { handelPreviousStap } = useStapper();
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
  const [showAward, setShowAward] = useState<boolean>(false);

  // get the saved plant position from the local storage
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
    setCareInfo(userPlants[tutorialPlantIndex]?.careInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handel the back button
  const handelBackButton = () => {
    handelPreviousStap();
  };

  // handel the drag event of the water icon
  const handelDragWater = (e: any, data: any) => {
    setDragging(true);
  };

  // handel the stop drag event of the water icon
  const handelStopDragWater = () => {
    setGaveWater(true);
    setDragStoped(true);
    setTextCloud(
      "Je zaden beginnen te groeien, gefeliciteerd! Morgen moeten we weer water geven."
    );
  };

  // handel the claim of the award
  const handelClaim = () => {
    router.push("/home");
  };

  // set timer to setGaveWater false after 5 seconds
  useEffect(() => {
    if (!gaveWater) return;
    const timer = setTimeout(() => {
      setGaveWater(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [gaveWater]);

  useEffect(() => {
    if (!gaveWater) return;

    const awardTimer = setTimeout(() => {
      if (!showAward) {
        setShowAward(true);
      }
    }, 5000);

    return () => {
      clearTimeout(awardTimer);
    };
  }, [gaveWater, showAward]);

  return (
    <TutorialLayout disabledNext={disabledNextButton} cloudText={textCloud}>
      {showAward && (
        <Award
          award="potted-plant-smile"
          text="plant pot"
          handelClaim={handelClaim}
        />
      )}

      <PopUp isOpen={popUpIsOpen} pupUpType="budPopup" backgroundColor="white">
        <p className={$.text}>
          Je plant heeft{" "}
          <span className={$.greenText}>
            {careInfo?.Watering} {careInfo?.amountOfWater}
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
          <Button text="Terug" color="brown" onClick={handelBackButton} />

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
