"use client";
import React from "react";
import cs from "classnames";
import Image from "next/image";
import $ from "./Button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  text?: string;
  color: "green" | "brown" | "white" | "transparent";
  disabled?: boolean;
  icon?: string;
  rowDirection?: boolean;
  minpadding?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  color,
  disabled = false,
  icon,
  rowDirection = false,
  minpadding,
}) => {
  let imageSrc = `/images/icons/${icon}.svg`;
  if (icon) {
    return (
      <button
        className={cs(
          $.button,
          {
            [$.green]: color === "green",
            [$.brown]: color === "brown",
            [$.white]: color === "white",
            [$.transparent]: color === "transparent",
          },
          { [$.disabled]: disabled },
          { [$.withIcon]: icon },
          { [$.rowDirection]: rowDirection },
          { [$.minpadding]: minpadding }
        )}
        disabled={disabled}
        onClick={onClick}
      >
        <div className={cs($.iconContainer, { [$.coveredIcon]: !text })}>
          <Image
            src={imageSrc}
            className={$.icon}
            layout="fill"
            alt="button icon"
          />
        </div>
        {text && <p className={cs($.buttonText, $.minMargin)}>{text}</p>}
      </button>
    );
  } else {
    return (
      <button
        className={cs(
          $.button,
          {
            [$.green]: color === "green",
            [$.brown]: color === "brown",
            [$.white]: color === "white",
            [$.transparent]: color === "transparent",
          },
          { [$.disabled]: disabled },
          { [$.minpadding]: minpadding }
        )}
        disabled={disabled}
        onClick={onClick}
      >
        {text && <p className={cs($.buttonText)}>{text}</p>}
      </button>
    );
  }
};

export default Button;
