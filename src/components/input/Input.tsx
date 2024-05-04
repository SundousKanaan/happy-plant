import React, { use, useEffect, useState } from "react";
import $ from "./Input.module.scss";
import cs from "classnames";

interface InputProps {
  type: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  onChange,
}) => {
  const [inputType, setInputType] = useState(type);
  const [boldFont, setBoldFont] = useState(false);

  const showPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(event);

    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    if (inputType === "password") {
      setBoldFont(true);
    } else if (inputType === "text") {
      setBoldFont(false);
    }
  };

  if (type === "password") {
    return (
      <label className={$.inputLabel}>
        <button className={$.eyeButton} onClick={showPassword}></button>
        <input
          className={cs($.input, {
            [$.boldFont]: !boldFont,
          })}
          type={inputType}
          placeholder={placeholder}
          maxLength={10}
          minLength={5}
          pattern="[^' ']+"
          onChange={onChange}
        />
      </label>
    );
  } else {
    return (
      <input
        className={$.input}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  }
};

export default Input;
