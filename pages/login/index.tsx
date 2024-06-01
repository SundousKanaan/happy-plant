import React, { useState } from "react";
import LoginForm from "@/src/components/Login-Form/LoginForm";
import SingupForm from "@/src/components/Singup-Form/SingupForm";
import Button from "@/src/components/Button/Button";
import { useAccount } from "@/src/contexts/account/accountContext";
import { Bud } from "@/src/components/Bud/Bud";
import $ from "./Login.module.scss";

const Login = () => {
  const { login, signup, errorMessage, refreshErrorMessage } = useAccount();
  const [signingUp, setSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // handel the input
  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    refreshErrorMessage();
    const { type, value, name } = event.target;

    if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    }

    if (name === "firstName") {
      setFirstName(value);
    }
    if (name === "lastName") {
      setLastName(value);
    }
  };

  // handel the signup
  const handelSignup = () => {
    signup(email, password, firstName, lastName);
    if (errorMessage !== "") {
      refreshErrorMessage();
    }
  };

  // handel the login
  const handelLogin = () => {
    login(email, password);
    if (errorMessage !== "") {
      refreshErrorMessage();
    }
  };

  return (
    <section className={$.mainContainer}>
      <div className={$.budContainer}>
        <Bud type="login" />
      </div>
      {signingUp ? (
        <div className={$.formContainer}>
          <SingupForm onChange={handelInputChange} />
          <p className={$.ForgottenNote}>Forgotten password?</p>

          <span className={$.errorMessage}>{errorMessage}</span>

          <div className={$.buttonContainer}>
            <Button text="Signup" color="brown" onClick={handelSignup} />
          </div>
          <p className={$.pElement}>Of</p>
          <div className={$.buttonContainer}>
            <Button
              text="Login"
              color="green"
              onClick={() => setSigningUp(false)}
            />
          </div>
        </div>
      ) : (
        <div className={$.formContainer}>
          <LoginForm onChange={handelInputChange} />

          <p className={$.ForgottenNote}>Forgotten password?</p>

          <span className={$.errorMessage}>{errorMessage}</span>

          <div className={$.buttonContainer}>
            <Button text="Login" color="green" onClick={handelLogin} />
          </div>
          <p className={$.pElement}>Of</p>

          <div className={$.buttonContainer}>
            <Button
              text="Signup"
              color="brown"
              onClick={() => setSigningUp(true)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
