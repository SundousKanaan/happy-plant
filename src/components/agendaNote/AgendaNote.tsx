import React from "react";
import $ from "./AgendaNote.module.scss";
import Image from "next/image";
import cs from "classnames";

interface AgendaNoteProps {
  plantType: string;
  careType: string;
  plantName: string;
  currentDay: boolean;
  careDone: boolean;
  key?: number;
}

const AgendaNote: React.FC<AgendaNoteProps> = ({
  plantType,
  plantName,
  careType,
  key,
  currentDay = false,
  careDone = false,
}) => {
  let icon = "";

  if (plantType === "digital") {
    icon = "phone";
  } else {
    icon = "house";
  }
  return (
    <button
      className={cs(
        $.container,
        { [$.currentDay]: currentDay },
        { [$.careDone]: careDone }
      )}
      key={key}
    >
      <div className={$.plantTypeIcon}>
        <Image
          src={`/images/icons/${icon}.svg`}
          alt={`${plantType} icon`}
          layout="fill"
          className={$.image}
        />
      </div>
      <div className={$.careTypeIcon}>
        <Image
          src={`/images/icons/${careType}.svg`}
          alt={`${careType} icon`}
          layout="fill"
          className={$.image}
        />
      </div>
      <p className={$.text}>{plantName}</p>
    </button>
  );
};

export default AgendaNote;
