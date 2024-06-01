import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dataBase from "@/data/database.json";
import { AccountType } from "@/ts/types";

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
  account?: AccountType;
  refreshAccount: () => void;
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
  const [account, setAccount] = useState<AccountType | undefined>(undefined);

  const refreshErrorMessage = () => {
    setErrorMessage("");
  };

  // check if the user is logged in or not
  const login = (email: string, password: string) => {
    const users: AccountType[] = dataBase;
    const user = users.find((user) => user.email === email);

    // Controleer of de gebruiker bestaat en of het wachtwoord overeenkomt
    if (user && user.password === password) {
      localStorage.setItem("account", JSON.stringify(user));

      setAccount(user);
      setIsLoggedIn(true);
      router.push("/intro");
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  // Create a new user account
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
        stars: 0,
        userImage: "/images/user-placeholder-image.svg",
        plants: [],
        posts: [],
        followers: [],
        following: [],
        savedPosts: [],
        awards: {
          type: "",
          totalStars: 0,
          imagesrc: "",
          win: false,
        },
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
      setAccount(newUser);
      localStorage.setItem("account", JSON.stringify(newUser));

      router.push("/intro");
    }
  };

  // Refresh the account data
  const refreshAccount = () => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      try {
        const updatedAccount = JSON.parse(storedAccount);
        setAccount(updatedAccount);
      } catch (error) {
        console.log("Error parsing account data:", error);
      }
    } else {
      console.log("No account data found in localStorage");
    }
  };

  useEffect(() => {
    refreshAccount();
  }, []);

  return (
    <AccountContext.Provider
      value={{
        isLoggedIn,
        login,
        signup,
        errorMessage,
        refreshErrorMessage,
        account,
        refreshAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
