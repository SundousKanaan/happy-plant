import React from "react";
import $ from "./Icon.module.scss";
import Image from "next/image";
import cs from "classnames";

interface IconProps {
  icon?: string;
  bg?: string;
  text?: string;
  intro?: boolean;
}

export const Icon: React.FC<IconProps> = ({ icon, bg, text, intro }) => {
  let imageSrc;
  if (icon) {
    imageSrc = `/images/icons/${icon}.svg`;
  } else {
    imageSrc = `/images/${bg}.svg`;
  }
  return (
    <div className={$.container}>
      <div className={cs($.imageContainer, { [$.noneText]: !text })}>
        <Image
          src={imageSrc}
          className={cs($.iconImage, { [$.bgImage]: bg })}
          layout="fill"
          alt="icon"
        />
      </div>
      {text && (
        <p
          className={cs(
            $.iconText,
            { [$.introStyle]: intro === true },
            { [$.minMargin]: bg }
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
};
