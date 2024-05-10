import React from "react";
import Image from "next/image";
import $ from "./BudCloud.module.scss";
import cs from "classnames";

interface BudCloudProps {
  type: "login" | "normal" | "happy" | "scared";
  text: string;
  children?: React.ReactNode;
  isOpen: boolean;
}

export const BudCloud: React.FC<BudCloudProps> = ({
  type,
  text,
  isOpen = false,
  children,
}) => {
  let imageSrc = "";
  if (type === "normal") {
    imageSrc = "/images/Bud/Budnormal.svg";
  } else if (type === "happy") {
    imageSrc = "/images/Bud/Budhappy.svg";
  } else if (type === "scared") {
    imageSrc = "/images/Bud/Budscared.svg";
  }

  return (
    <div
      className={cs($.budCloudContainer, {
        [$.openCloud]: isOpen === true,
        [$.closeCloud]: isOpen === false,
      })}
    >
      <div className={$.imageContainer}>
        <Image
          src={imageSrc}
          className={$.image}
          layout="fill"
          alt="Bud the assistent"
        />
      </div>
      <div className={cs($.textContainer, { [$.openText]: isOpen === true })}>
        <p className={$.text}>{text}</p>
      </div>
      {children && <div className={$.children}>{children}</div>}
    </div>
  );
};
