import React from "react";
import { Icon } from "@/src/components/Icon/Icon";
import $ from "./stap1.module.scss";

interface stapProps {
  handleCameraClick: () => void;
}

const Stap1: React.FC<stapProps> = ({ handleCameraClick }) => {
  return (
    <ul className={$.iconsList}>
      <li className={$.icon}>
        <button className={$.iconButton} onClick={handleCameraClick}>
          <Icon icon="camera" text="Mijn kamer" />
        </button>
      </li>
      <li className={$.icon}>
        <button className={$.iconButton}>
          <Icon bg="bedroom" text="Slaapkamer" />
        </button>
      </li>
      <li className={$.icon}>
        <button className={$.iconButton}>
          <Icon bg="livingroom" text="Woonkamer" />
        </button>
      </li>
    </ul>
  );
};

export default Stap1;
