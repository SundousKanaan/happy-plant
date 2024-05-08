"use client";
import React from "react";
import cs from "classnames";
import Image from "next/image";
import $ from "./Button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  color: "green" | "bruin" | "white";
  disabled?: boolean;
  withIcon?: boolean;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  color,
  disabled = false,
  withIcon = false,
  icon = "house",
}) => {
  let imageSrc = `/images/icons/${icon}.svg`;
  if (withIcon === true) {
    return (
      <button
        className={cs(
          $.button,
          {
            [$.green]: color === "green",
            [$.bruin]: color === "bruin",
            [$.white]: color === "white",
          },
          { [$.disabled]: disabled },
          { [$.withIcon]: withIcon }
        )}
        disabled={disabled}
        onClick={onClick}
      >
        <div className={$.iconContainer}>
          <Image
            src={imageSrc}
            className={$.icon}
            layout="fill"
            alt="button icon"
          />
        </div>
        <p className={$.buttonText}>{text}</p>
      </button>
    );
  } else {
    return (
      <button
        className={cs(
          $.button,
          {
            [$.green]: color === "green",
            [$.bruin]: color === "bruin",
            [$.white]: color === "white",
          },
          { [$.disabled]: disabled }
        )}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
};

export default Button;
