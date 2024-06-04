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
  const router = useRouter();
  const handelRoomClick = (room: string) => {};

  const handelCamera = () => {
    router.push("/tutorial/camera");
  };

  return (
    <TutorialLayout cloudText="Laat ons eerst jouw zorglocatie kiezen!">
      <div className={$.stap1}>
        <ul className={$.iconsList}>
          <li className={$.icon}>
            <button className={$.iconButton} onClick={handelCamera}>
              <Icon icon="camera" text="Mijn kamer" />
            </button>
          </li>
          <li className={$.icon}>
            <button
              className={$.iconButton}
              onClick={() => handelRoomClick("bedroom")}
              disabled
            >
              <Icon bg="bedroom" text="Slaapkamer" />
            </button>
          </li>
          <li className={$.icon}>
            <button
              className={$.iconButton}
              onClick={() => handelRoomClick("livingroom")}
              disabled
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
