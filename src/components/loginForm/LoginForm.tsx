"use client";
import React from "react";
import Input from "../input/Input";
import $ from "./LoginForm.module.scss";

interface LiginFormProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm: React.FC<LiginFormProps> = ({ onChange }) => {
  return (
    <form className={$.formContainer}>
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

export default LoginForm;
