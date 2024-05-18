import React, { useEffect, useState } from "react";
import Image from "next/image";
import TutorialLayout from "@/src/layouts/tutorialLayout";
import cs from "classnames";
import $ from "./stap3.module.scss";
import Draggable from "react-draggable";
import { useStapper } from "@/src/contexts/tutorialStapper/tutorialStapper";

interface stapProps {}

const Stap3: React.FC<stapProps> = ({}) => {
  const BackgroundCheck = require("@/pages/api/background-check.js");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [plantPosition, setPlantPosition] = useState({ x: 0, y: 0 });
  const [plantPositionCheck, setPlantPositionCheck] = useState<number>();

  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
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
    console.log(percentage);

    setPlantPositionCheck(Number(percentage));

    // setCloudText(4);
  };

  const darkFunction = (mean: any) => {
    let Darkness = mean.toFixed(2);
    const percentage = (Darkness * 100).toFixed(0);
    setPlantPositionCheck(Number(percentage));
    // setCloudText(5);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const defaultPosition = {
    x: (windowSize.width - 144) / 2, // De breedte van het Draggable element is 160px
    y: (windowSize.height - 144) / 2, // De hoogte van het Draggable element is 160px
  };

  return (
    <TutorialLayout>
      <Draggable axis="both" handle=".braggableElement" onDrag={handelDrag}>
        <div
          className={cs("braggableElement", $.stap3, {
            [$.stopMoving]: isDragging,
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
