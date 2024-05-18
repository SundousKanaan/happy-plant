// import React, { useRef, useEffect, useState, use } from "react";
// import $ from "./Tutorial.module.scss";
// import Image from "next/image";

// import { useRouter } from "next/router";

// import cs from "classnames";
// import { PlantType } from "@/ts/types";
// import texts from "@/ts/texts";
// import plantsDatabase from "@/data/plantsDatabase.json";
// import Draggable from "react-draggable";
// import { useAccount } from "@/src/contexts/account/accountContext";

// import Stap1 from "./stap1";
// import Stap2 from "./stap2";
// import Stap3 from "./stap3";
// import TutorialLayout from "@/src/layouts/tutorialLayout";

// const Tutorial: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   // variabels
//   const router = useRouter();

//   const [isDragging, setIsDragging] = useState(false);
//   const [plantPositionCheck, setPlantPositionCheck] = useState<number>();
//   const [plantPosition, setPlantPosition] = useState({ x: 0, y: 0 });
//   const [chosenPlant, setChosenPlant] = useState<string | undefined>();

//   const database: {
//     [key: string]: { plants: PlantType[] };
//   } = require("@/data/database.json");
//   const BackgroundCheck = require("../api/background-check.js");

// ==================================
// main functions
// ==================================

// if (tutorialStap + 1 === 4) {
//   if (userId === undefined) return;
//   const userPlants = database[userId].plants;
//   const tutorialPlantIndex = userPlants.findIndex(
//     (plant) => plant.id === 0
//   );

//   if (tutorialPlantIndex !== -1) {
//     userPlants[tutorialPlantIndex].position = plantPosition;
//     const updatedData = JSON.stringify(database, null, 2);

//     const saveData = async (updatedData: string) => {
//       try {
//         const response = await fetch("/api/saveData", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: updatedData,
//         });

//         if (!response.ok) {
//           throw new Error("Failed to save data");
//         }

//         return response;
//       } catch (error: any) {
//         console.error("Error saving data:", error.message);
//         return { error: error.message };
//       }
//     };
//     saveData(updatedData);
//   }
// }

// const handleCloudText = (stap: number) => {
//   setCloudText(stap);
//   setTutorialStap(stap);
// };

// ==================================
// tutorialStap update
// ==================================

// useEffect(() => {
//   // Check if localStorage is available in the browser environment
//   if (typeof window !== "undefined") {
//     // Retrieve the currently saved step number from localStorage
//     const savedStap = localStorage.getItem("tutorialStap");

//     // If there is a saved step, use it, otherwise use the current step
//     const initialStap = savedStap ? parseInt(savedStap, 10) : tutorialStap;

//     if (initialStap !== tutorialStap) {
//       setTutorialStap(initialStap);
//       handleCloudText(initialStap);
//     }
//   }
// }, [tutorialStap]);

// useEffect(() => {
//   // When the tutorialStep changes, save the new step number to localStorage
//   localStorage.setItem("tutorialStap", tutorialStap.toString());
//   if (tutorialStap === 2 || tutorialStap === 3) {
//     setNextButtonDisabled(true);
//   } else {
//     setNextButtonDisabled(false);
//   }

//   console.log({ tutorialStap });
// }, [tutorialStap]);

// useEffect(() => {
//   handleCloudText(tutorialStap);
// }, [tutorialStap]);

// ==================================
// stap 1 functions => background select
// ==================================

// const handleRoomSelect = (room: string) => {
//   setBg(`/images/camera/${room}.jpg`);
// };

// ==================================
// stap 2 functions => plant select
// ==================================

// ==================================
// stap 3 functions => plant position
// ==================================

// const handleResize = () => {
//   setWindowSize({ width: window.innerWidth, height: window.innerHeight });
// };

// const handelDrag = (e: any, data: any) => {
//   setIsDragging(true);
//   BackgroundCheck.init({
//     targets: ".braggableElement",
//     images: ".backgroundPhoto",
//     lightFunction: lightFunction,
//     darkFunction: darkFunction,
//   });

//   setPlantPosition({ x: data.x, y: data.y });
//   BackgroundCheck.refresh();
// };
// const lightFunction = (mean: any) => {
//   let Lighting = mean.toFixed(2);
//   const percentage = (Lighting * 100).toFixed(0);
//   console.log(percentage);

//   setPlantPositionCheck(Number(percentage));
//   setNextButtonDisabled(false);
//   setCloudText(4);
// };

// const darkFunction = (mean: any) => {
//   let Darkness = mean.toFixed(2);
//   const percentage = (Darkness * 100).toFixed(0);
//   setPlantPositionCheck(Number(percentage));
//   setNextButtonDisabled(true);
//   setCloudText(5);
// };

// useEffect(() => {
//   handleResize();

//   window.addEventListener("resize", handleResize);
//   handleResize();

//   return () => window.removeEventListener("resize", handleResize);
// }, []);

// const defaultPosition = {
//   x: (windowSize.width - parseFloat("160px")) / 2,
//   y: (windowSize.height - parseFloat("160px")) / 2,
// };

// console.log({ children });

// ==================================
// stap 4 functions => plant watering
// ==================================

// return (
{
  /* {tutorialStap === 1 && (
        <div className={$.stap1}>
          <Stap1 onRoomSelect={handleRoomSelect} />
        </div>
      )}

      {tutorialStap === 2 && (
        <>
          <div className={$.stap2}>
            <Stap2
              setTutorialStap={setTutorialStap}
              setChosenPlant={setChosenPlant}
            />
          </div>
        </>
      )} */
}

/* {tutorialStap === 3 && (
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
            <Stap3 />
          </div>
        </Draggable>
      )}

      {tutorialStap === 4 && <div className={$.stap4}>test</div>} }*/
// );
// };

// export default Tutorial;
