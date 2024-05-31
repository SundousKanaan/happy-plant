import React, { useEffect } from "react";
import { Icon } from "@/src/components/Icon/Icon";
import cs from "classnames";
import $ from "./stap1.module.scss";
import { useRouter } from "next/router";
import TutorialLayout from "@/src/layouts/tutorialLayout";

interface stapProps {
  onRoomSelect: (room: string) => void;
}

const Stap1: React.FC<stapProps> = ({ onRoomSelect }) => {
  // const [selectedRoom, setSelectedRoom] = React.useState("");
  const router = useRouter();
  const handleRoomClick = (room: string) => {
    // onRoomSelect(room);
    // if (room === "livingroom") {
    //   setSelectedRoom("livingroom");
    // } else if (room === "bedroom") {
    //   setSelectedRoom("bedroom");
    // }
  };

  const handleCamera = () => {
    // setSelectedRoom("");
    router.push("/tutorial/camera");
  };

  return (
    <TutorialLayout cloudText="Laat ons eerst jouw zorglocatie kiezen!">
      <div className={$.stap1}>
        <ul className={$.iconsList}>
          <li className={$.icon}>
            <button className={$.iconButton} onClick={handleCamera}>
              <Icon icon="camera" text="Mijn kamer" />
            </button>
          </li>
          <li
            className={$.icon}

            // className={cs($.icon, { [$.selected]: selectedRoom === "bedroom" })}
          >
            <button
              className={$.iconButton}
              onClick={() => handleRoomClick("bedroom")}
            >
              <Icon bg="bedroom" text="Slaapkamer" />
            </button>
          </li>
          <li
            className={$.icon}

            // className={cs($.icon, {
            //   [$.selected]: selectedRoom === "livingroom",
            // })}
          >
            <button
              className={$.iconButton}
              onClick={() => handleRoomClick("livingroom")}
            >
              <Icon bg="livingroom" text="Woonkamer" />
            </button>
          </li>
        </ul>
      </div>
    </TutorialLayout>
  );
};

export default Stap1;
