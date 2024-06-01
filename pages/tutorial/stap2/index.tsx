import React, { useRef, useState } from "react";
import { Icon } from "@/src/components/Icon/Icon";
import cs from "classnames";
import $ from "./stap2.module.scss";
import { useAccount } from "@/src/contexts/account/accountContext";
import Button from "@/src/components/Button/Button";
import { PlantType } from "@/ts/types";
import plantsDatabase from "@/data/plantsDatabase.json";
import TutorialLayout from "@/src/layouts/tutorialLayout";
import { useStapper } from "@/src/contexts/tutorialStapper/tutorialStapper";

const Stap2 = () => {
  const { handelNexttStap } = useStapper();
  const { account } = useAccount();

  const userId = account?.id;
  const listContainerRef = useRef<HTMLUListElement>(null);
  const database: {
    [key: string]: { plants: PlantType[] };
  } = require("@/data/database.json");

  const [openOptionsList, setOpenOptionsList] = useState(false);
  const [disableToTop, setDisableToTop] = useState(true);
  const [disableToBottom, setDisableToBottom] = useState(false);

  // scroll to the top of the flouwer list
  const scrollToTop = () => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;

      setDisableToTop(true);
      setDisableToBottom(false);
    }
  };

  // scroll to the bottom of the plants list
  const scrollToBottom = () => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop =
        listContainerRef.current.scrollHeight;

      setDisableToTop(false);
      setDisableToBottom(true);
    }
  };

  // select a plant from the list and update the database with the new plant data
  const selectPlant = (plant: any) => {
    localStorage.setItem("chosenPlant", plant.name);
    // update the database with the new plant data of the plant with id 0
    if (userId === undefined) return;
    const userPlants = database[userId].plants;
    const tutorialPlantIndex = userPlants.findIndex((plant) => plant.id === 0);
    if (tutorialPlantIndex !== -1) {
      userPlants[tutorialPlantIndex].databaseId = plant.id;
      userPlants[tutorialPlantIndex].familyName = plant.name;
      userPlants[tutorialPlantIndex].type = plant.type;
      userPlants[tutorialPlantIndex].careInfo.Watering = plant.water;
      userPlants[tutorialPlantIndex].careInfo.amountOfWater =
        plant.amountOfWater;
      userPlants[tutorialPlantIndex].careInfo.Light = plant.light;
      userPlants[tutorialPlantIndex].careInfo.Temperature = plant.temperature;
      userPlants[tutorialPlantIndex].careInfo.Poisoning = plant.toxicityto;
      userPlants[tutorialPlantIndex].careInfo.careLevel = plant.careLevel;
      userPlants[tutorialPlantIndex].position.x = 0;
      userPlants[tutorialPlantIndex].position.y = 0;

      const updatedData = JSON.stringify(database, null, 2);

      const saveData = async (updatedData: string) => {
        try {
          const response = await fetch("/api/saveData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: updatedData,
          });

          if (!response.ok) {
            throw new Error("Failed to save data");
          }

          return response;
        } catch (error: any) {
          console.error("Error saving data:", error.message);
          return { error: error.message };
        }
      };

      saveData(updatedData);
    }
    handelNexttStap();
  };

  // open and close the options list
  const handelOpenOptionsList = () => {
    if (openOptionsList) {
      setOpenOptionsList(false);
    } else {
      setOpenOptionsList(true);
    }
  };

  return (
    <TutorialLayout
      disabledNext
      cloudText="Wat een prachtige plek om je plant te verzorgen"
    >
      <div className={$.stap2}>
        <ul className={$.iconsList}>
          <li className={cs($.icon)}>
            <button
              className={cs($.iconButton, { [$.selected]: openOptionsList })}
              onClick={handelOpenOptionsList}
            >
              <Icon icon="flower" text="Bloemen" />
            </button>
          </li>
          <li className={cs($.icon, $.disabled)}>
            <button className={$.iconButton} disabled>
              <Icon icon="Leafyplant" text="Bladplanten" />
            </button>
          </li>
          <li className={cs($.icon, $.disabled)}>
            <button className={$.iconButton} disabled>
              <Icon icon="succulent" text="Vetplanten" />
            </button>
          </li>
        </ul>
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
                    onClick={() => selectPlant(plant)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </TutorialLayout>
  );
};

export default Stap2;
