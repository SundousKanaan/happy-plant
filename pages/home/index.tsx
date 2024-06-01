import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/src/components/User/User";
import { Icon } from "@/src/components/Icon/Icon";
import cs from "classnames";
import $ from "./homePage.module.scss";
import { useRouter } from "next/router";
import PopUP from "@/src/components/PopUp/PopUp";
import CareHelp from "@/src/components/CareHelp/CareHelp";
import Menulist from "@/src/components/menuList/MenuList";
import { PlantPosition } from "@/ts/types";
import Input from "@/src/components/Input/Input";
import Button from "@/src/components/Button/Button";

const tasks = [
  {
    type: "doel",
    text: "Voltooi de tutorial",
    doen: true,
  },
  {
    type: "step",
    text: "Geef je plant een naam",
    doen: true,
  },
  {
    type: "step",
    text: "2 dagen achter elkaar water geven",
    doen: false,
  },
  {
    type: "step",
    text: "3 dagen achter elkaar water geven",
    doen: false,
  },
  {
    type: "step",
    text: "7 dagen achter elkaar water geven",
    doen: false,
  },
  {
    type: "doel",
    text: "Gezold plant voor 1 week",
    doen: false,
  },
  {
    type: "Step",
    text: "Gebruik 1 beloning",
    doen: false,
  },
  {
    type: "Step",
    text: "Gebruik 3 beloningen",
    doen: false,
  },
  {
    type: "Step",
    text: "share 1 plant met een vriend",
    doen: false,
  },
  {
    type: "doel",
    text: "zorg 2 planten tegelijkertijd",
    doen: false,
  },
];

const Home = () => {
  const router = useRouter();
  const [bg, setBg] = useState("");
  const [isRenameOpen, setIsRenameOpen] = useState(true);
  const [plantName, setPlantName] = useState("");
  const [disabledSaveName, setDisabledSaveName] = useState(true);
  const [countdown, setCountdown] = useState(24 * 60 * 60);
  const [tasksListIsOpen, setTasksListIsOpen] = useState(false);

  // get the background image from the local storage
  useEffect(() => {
    const storedBg = localStorage.getItem("backgroundImage");
    if (storedBg) {
      setBg(storedBg);
    }
  }, [bg]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [careHelpIsOpen, setCareHelpIsOpen] = useState(false);
  const [savedPlantPosition, setSavedPlantPosition] = useState<PlantPosition>({
    x: 0,
    y: 0,
  });

  // get the plant position from the local storage
  useEffect(() => {
    const SavedPlantPosition = localStorage.getItem("plantPosition");
    setSavedPlantPosition(
      SavedPlantPosition ? JSON.parse(SavedPlantPosition) : { x: 0, y: 0 }
    );
  }, []);

  // make a timer to make a countdown for the next watering
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // get the plant name from the local storage
  useEffect(() => {
    const plantName = localStorage.getItem("plantName");
    if (plantName) {
      setIsRenameOpen(false);
      setPlantName(plantName);
    }
  }, []);

  // handel the rename of the plant
  const handelRename = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setPlantName(e.target.value);
      localStorage.setItem("plantName", e.target.value);
      setDisabledSaveName(false);
    } else {
      setDisabledSaveName(true);
    }
  };

  // save the name of the plant
  const handelSaveName = () => {
    setIsRenameOpen(false);
  };

  // format the time to be in the format of HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // open the menu list
  const openMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  // open the care help
  const openCareHelp = () => {
    if (menuIsOpen) {
      setMenuIsOpen(!menuIsOpen);
    }
    setCareHelpIsOpen(!careHelpIsOpen);
  };

  return (
    <section className={$.container}>
      {isRenameOpen && (
        <div className={$.renameContainer}>
          <div className={$.renameBlock}>
            <h2 className={$.renameTitle}>Geef je plant een naam</h2>
            <div className={$.input}>
              <Input
                type="text"
                name="text"
                placeholder="Jouw plant naam ..."
                onChange={handelRename}
              />
            </div>
            <div>
              <Button
                text="Opslaan"
                color="green"
                disabled={disabledSaveName}
                onClick={handelSaveName}
              />
            </div>
          </div>
        </div>
      )}

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

      <div className={cs($.tasksContainer, { [$.open]: tasksListIsOpen })}>
        <button
          className={$.tasksButton}
          onClick={() => setTasksListIsOpen(!tasksListIsOpen)}
        >
          Taken
        </button>
        <ul className={$.tasksList}>
          {tasks.map((task, index) => {
            return (
              <li
                key={index}
                className={cs(
                  $.taskItem,
                  { [$.doel]: task.type === "doel" },
                  { [$.doen]: task.doen }
                )}
              >
                {task.text}
              </li>
            );
          })}
        </ul>
      </div>

      {tasks.find((task) => task.doen === false) && (
        <p className={$.nextTaskText}>
          volgende: {tasks.find((task) => task.doen === false)?.text}
        </p>
      )}

      <div className={$.nextAward}>
        <div className={$.icon}>
          <Image
            src="/images/icons/shield.svg"
            layout="fill"
            alt="shield icon"
          />
        </div>
        <p className={$.awardText}>Volgende Award</p>
      </div>

      <div className={$.actionButtons}>
        <div className={$.buttonItem}>
          <button className={$.button} onClick={() => router.push("/agenda")}>
            <Icon icon="agenda" text="agenda" />
          </button>
        </div>
        <div className={$.buttonItem}>
          <button className={$.button} disabled>
            <div className={$.wateringIcon}>
              <Image
                src="/images/icons/watering.svg"
                layout="fill"
                alt="watering icon"
              />
            </div>
            <p className={$.wateringText}>{`-${formatTime(countdown)}h`}</p>
          </button>
        </div>
      </div>

      <div className={$.changeButton}>
        <Icon icon="Camelia-plant" />
        <p className={$.changeButtonText}>Hoofdplan veranderen</p>
      </div>

      <div
        className={$.plant}
        style={{
          transform: `translate(${savedPlantPosition.x}px, ${savedPlantPosition.y}px)`,
        }}
      >
        <div className={$.nameContainer}>
          <p className={$.plantName}>{plantName}</p>
        </div>
        <div className={cs($.fakePLant)}>
          <div className={$.leafRight}></div>
          <div className={$.leafLeft}></div>
        </div>
        <Image
          src="/images/icons/pot-default.svg"
          alt="pot-default"
          className={$.potImage}
          layout="fill"
        />
      </div>

      {!menuIsOpen && (
        <div className={cs($.buttonItem, $.menuButton)}>
          <button className={$.button} onClick={openMenu}>
            <p className={$.buttonText}>Menu</p>
            <div className={$.menuIcon}>
              <Image
                src="/images/icons/menuGrid.svg"
                layout="fill"
                alt="menu icon"
              />
            </div>
          </button>
        </div>
      )}

      {menuIsOpen && (
        <div className={$.menuList}>
          <Menulist handelColeMenu={openMenu} openCareHelp={openCareHelp} />
        </div>
      )}

      {careHelpIsOpen && (
        <PopUP
          isOpen={true}
          pupUpType="page"
          title="ZorgHulp"
          backgroundColor="brown"
          ClosePopUp={openCareHelp}
        >
          <CareHelp currentPath="/careHelp" />
        </PopUP>
      )}
    </section>
  );
};

export default Home;
