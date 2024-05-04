"use client";
import React from "react";
import cs from "classnames";
import $ from "./Button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  color: "green" | "bruin" | "white";
  disabled?: boolean;
  withIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  color,
  disabled,
  withIcon,
}) => {
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
};

export default Button;
