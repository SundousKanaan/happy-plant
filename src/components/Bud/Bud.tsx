import React from "react";
import Image from "next/image";
import cs from "classnames";
import $ from "./Bud.module.scss";

interface BudProps {
  type: "login" | "normal" | "happy" | "scared";
}

export const Bud: React.FC<BudProps> = ({ type }) => {
  let imageSrc = "";
  if (type === "normal") {
    imageSrc = "/images/Bud/Budnormal.svg";
  } else if (type === "happy") {
    imageSrc = "/images/Bud/Budhappy.svg";
  } else if (type === "scared") {
    imageSrc = "/images/Bud/Budscared.svg";
  } else {
    imageSrc = "/images/loginlogo.svg";
  }

  return (
    <Image
      src={imageSrc}
      className={cs($.BudImage, {
        [$.logo]: type === "login",
      })}
      layout="fill"
      alt="Bud the assistent"
    />
  );
};
