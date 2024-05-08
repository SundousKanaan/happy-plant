import React from "react";
import $ from "./Icon.module.scss";
import Image from "next/image";
import cs from "classnames";

interface IconProps {
  icon: string;
  text?: string;
  intro?: boolean;
}

export const Icon: React.FC<IconProps> = ({ icon, text, intro }) => {
  let imageSrc = `/images/icons/${icon}.svg`;
  return (
    <div className={$.container}>
      <div className={cs($.imageContainer, { [$.noneText]: !text })}>
        <Image
          src={imageSrc}
          className={$.iconImage}
          layout="fill"
          alt="icon"
        />
      </div>
      {text && (
        <p className={cs($.iconText, { [$.introStyle]: intro === true })}>
          {text}
        </p>
      )}
    </div>
  );
};
