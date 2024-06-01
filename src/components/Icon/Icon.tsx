import React from "react";
import $ from "./Icon.module.scss";
import Image from "next/image";
import cs from "classnames";

interface IconProps {
  icon?: string;
  bg?: string;
  text?: string;
  isFixedSize?: boolean;
  intro?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  bg,
  text,
  intro,
  isFixedSize = false,
}) => {
  // check if the icon is an icon or a background image
  let imageSrc;
  if (icon) {
    imageSrc = `/images/icons/${icon}.svg`;
  } else {
    imageSrc = `/images/${bg}.svg`;
  }

  return (
    <div className={$.container}>
      <div
        className={cs(
          $.imageContainer,
          { [$.noneText]: !text },
          { [$.number]: isFixedSize }
        )}
      >
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
            { [$.minMargin]: bg },
            { [$.smallerText]: isFixedSize }
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
};
