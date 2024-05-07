import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import dataBase from "@/data/BasisData.json";
import { AccountType, UserName } from "@/ts/types";

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
    // Typedefinitie voor de gebruikersarray toevoegen
    const users: AccountType[] = dataBase;

    // Zoek naar een gebruiker met de gegeven e-mail
    const user = users.find((user) => user.email === email);

    // Controleer of de gebruiker bestaat en of het wachtwoord overeenkomt
    if (user && user.password === password) {
      setIsLoggedIn(true);
      router.push("/intro");
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
    if (!email || !password || !firstName || !lastName) {
      setErrorMessage("Please fill out all fields correctly");
      return;
    }

    // Typedefinitie voor de gebruikersarray toevoegen
    const users: AccountType[] = dataBase;

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      setErrorMessage("User already exists");
    } else {
      const newUser: AccountType = {
        id: dataBase.length,
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

      // Typedefinitie voor de gebruikersarray toevoegen
      const updatedUsers: AccountType[] = [...dataBase, newUser];

      const dataStr: string = JSON.stringify(updatedUsers, null, 4);

      const saveData = async (dataStr: string) => {
        const response = await fetch("/api/saveData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: dataStr,
        });
      };

      await saveData(dataStr);
      router.push("/intro");
    }
  };

  return (
    <AccountContext.Provider
      value={{ isLoggedIn, login, signup, errorMessage, refreshErrorMessage }}
    >
      {children}
    </AccountContext.Provider>
  );
};
