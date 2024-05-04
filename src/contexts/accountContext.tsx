import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import dataBase from "@/data/BasisData.json";
import { User } from "@/ts/types";

interface AccountContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => void;
  errorMessage: string;
  refreshErrorMessage: () => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const refreshErrorMessage = () => {
    setErrorMessage("");
  };

  const login = (email: string, password: string) => {
    // Zoek naar een gebruiker met de gegeven e-mail
    const user = dataBase.find((user) => user.email === email);

    // Controleer of de gebruiker bestaat en of het wachtwoord overeenkomt
    if (user && user.password === password) {
      setIsLoggedIn(true);
      console.log("Login successful");
      // Doorstuur de gebruiker naar de homepage
      router.push("/homepage");
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    // Controleer of alle variabelen waarden hebben
    if (!email || !password || !firstName || !lastName) {
      setErrorMessage("Please fill out all fields correctly");
      return;
    }

    // Controleer of de gebruiker al bestaat
    const userExists = dataBase.some((user) => user.email === email);
    if (userExists) {
      setErrorMessage("User already exists");
    } else {
      // Voeg de nieuwe gebruiker toe aan de gegevens
      const newUser: User = {
        id: dataBase.length + 1,
        userName: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
        imageSrc: "",
        plants: [],
        posts: [],
        followers: [],
        following: [],
        savedPosts: [],
      };
      dataBase.push(newUser);
      const dataStr: String = JSON.stringify(dataBase, null, 4);
      const saveData = async (dataStr) => {
        const response = await fetch("/api/saveData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: dataStr,
        });

        if (response.ok) {
          console.log("Data saved successfully");
        } else {
          console.error("Failed to save data");
        }
      };

      await saveData(dataStr);
      console.log("User signed up successfully");
      // Doorstuur de gebruiker naar de homepage
      // router.push("/homepage");
    }
    console.log({ data: dataBase });
  };

  return (
    <AccountContext.Provider
      value={{ isLoggedIn, login, signup, errorMessage, refreshErrorMessage }}
    >
      {children}
    </AccountContext.Provider>
  );
};
