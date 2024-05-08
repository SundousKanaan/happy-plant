"use client";
import React from "react";
import Input from "../Input/Input";
import $ from "./SingupForm.module.scss";

interface LiginFormProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SingupForm: React.FC<LiginFormProps> = ({ onChange }) => {
  return (
    <form className={$.formContainer}>
      <div className={$.fullnameContainer}>
        <div className={$.firstNameContainer}>
          <Input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={onChange}
          />
        </div>
        <div className={$.lastNameContainer}>
          <Input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={onChange}
          />
        </div>
      </div>
      <div className={$.inputContainer}>
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          onChange={onChange}
        />
      </div>

      <div className={$.inputContainer}>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default SingupForm;
