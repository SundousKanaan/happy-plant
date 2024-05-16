import React from "react";
import { Icon } from "@/src/components/Icon/Icon";
import cs from "classnames";
import $ from "./stap1.module.scss";

interface stapProps {
  handleCameraClick: () => void;
  onRoomSelect: (room: string) => void;
}

const Stap1: React.FC<stapProps> = ({ handleCameraClick, onRoomSelect }) => {
  const [selectedRoom, setSelectedRoom] = React.useState("livingroom");
  const handleRoomClick = (room: string) => {
    onRoomSelect(room);
    if (room === "livingroom") {
      setSelectedRoom("livingroom");
    } else if (room === "bedroom") {
      setSelectedRoom("bedroom");
    }
  };
  return (
    <ul className={$.iconsList}>
      <li className={$.icon}>
        <button className={$.iconButton} onClick={handleCameraClick}>
          <Icon icon="camera" text="Mijn kamer" />
        </button>
      </li>
      <li className={cs($.icon, { [$.selected]: selectedRoom === "bedroom" })}>
        <button
          className={$.iconButton}
          onClick={() => handleRoomClick("bedroom")}
        >
          <Icon bg="bedroom" text="Slaapkamer" />
        </button>
      </li>
      <li
        className={cs($.icon, { [$.selected]: selectedRoom === "livingroom" })}
      >
        <button
          className={$.iconButton}
          onClick={() => handleRoomClick("livingroom")}
        >
          <Icon bg="livingroom" text="Woonkamer" />
        </button>
      </li>
    </ul>
  );
};

export default Stap1;
