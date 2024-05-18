import React, { useEffect, useState } from "react";
import Image from "next/image";
import TutorialLayout from "@/src/layouts/tutorialLayout";
import cs from "classnames";
import $ from "./stap4.module.scss";
import Draggable from "react-draggable";
import { useStapper } from "@/src/contexts/tutorialStapper/tutorialStapper";

interface stapProps {}

const Stap4: React.FC<stapProps> = ({}) => {
  const [savedPlantPosition, setSavedPlantPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setSavedPlantPosition(
      JSON.parse(localStorage.getItem("plantPosition") || "{}")
    );
  }, []);

  useEffect(() => {
    console.log({ savedPlantPosition });
  }, [savedPlantPosition]);

  return (
    <TutorialLayout>
      <div
        className={$.stap4}
        style={{
          transform: `translateX(${savedPlantPosition.x}px) translateY(${savedPlantPosition.y}px)`,
        }}
      >
        <div className={$.fakePLant}></div>
        <Image
          src="/images/icons/pot-default.svg"
          alt="stap3"
          className={$.potImage}
          layout="fill"
        />
      </div>
    </TutorialLayout>
  );
};

export default Stap4;
