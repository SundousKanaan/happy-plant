import React, { createContext, useContext, useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (email: string, password: string) => {
    // Zoek naar een gebruiker met de gegeven e-mail
    console.log({ data: dataBase });

    const user = dataBase.find((user) => user.email === email);

    // Controleer of de gebruiker bestaat en of het wachtwoord overeenkomt
    if (user && user.password === password) {
      setIsLoggedIn(true);
      console.log("Login successful");
    } else {
      console.log("Invalid email or password");
    }
  };

  const signup = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    // Controleer of de gebruiker al bestaat
    const userExists = dataBase.some((user) => user.email === email);
    if (userExists) {
      console.log("User already exists");
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
      console.log("User signed up successfully");
    }
    console.log({ data: dataBase });
  };

  return (
    <AccountContext.Provider value={{ isLoggedIn, login, signup }}>
      {children}
    </AccountContext.Provider>
  );
};
