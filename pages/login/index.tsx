import React, { useState } from "react";
import LoginForm from "@/src/components/loginForm/LoginForm";
import SingupForm from "@/src/components/singupForm/SingupForm";
import Button from "@/src/components/button/Button";
import { useAccount } from "@/src/contexts/accountContext";
import { Bud } from "@/src/components/Bud/Bud";
import $ from "./Login.module.scss";

const Login = () => {
  const { login, signup, errorMessage, refreshErrorMessage } = useAccount();
  const [signingUp, setSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    refreshErrorMessage();
    const { type, value, name } = event.target;
    console.log("handleInputChange", event.target);

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

  const handleSignup = () => {
    console.log("Signing up...", { firstName }, { lastName });
    signup(email, password, firstName, lastName);
  };

  const handleLogin = () => {
    console.log("Logging in...");
    login(email, password);
  };

  return (
    <section className={$.mainContainer}>
      <div className={$.budContainer}>
        <Bud type="login" />
      </div>
      {!signingUp ? (
        <div className={$.formContainer}>
          <LoginForm onChange={handleInputChange} />

          <p className={$.ForgottenNote}>Forgotten password?</p>

          <span className={$.errorMessage}>{errorMessage}</span>

          <div className={$.buttonContainer}>
            <Button text="Login" color="green" onClick={handleLogin} />
          </div>
          <p className={$.pElement}>Of</p>

          <div className={$.buttonContainer}>
            <Button
              text="Signup"
              color="bruin"
              onClick={() => setSigningUp(true)}
            />
          </div>
        </div>
      ) : (
        <div className={$.formContainer}>
          <SingupForm onChange={handleInputChange} />
          <p className={$.ForgottenNote}>Forgotten password?</p>

          <span className={$.errorMessage}>{errorMessage}</span>

          <div className={$.buttonContainer}>
            <Button text="Signup" color="bruin" onClick={handleSignup} />
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
      )}
    </section>
  );
};

export default Login;
