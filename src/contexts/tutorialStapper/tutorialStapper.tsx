import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const StapperContext = createContext<any>(null);

export const useStapper = () => {
  return useContext(StapperContext);
};

export const StapperProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [tutorialStap, setTutorialStap] = useState(0);
  const [savedpreviousStap, setSavedPreviousStap] = useState<string>("");
  const [disabledNextButton, setDisabledNextButton] = useState<boolean>(false);

  const handleNexttStap = (stap: number) => {
    if (stap) {
      setTutorialStap(stap);
    } else {
      setTutorialStap(tutorialStap + 1);
    }
  };

  const handlePreviousStap = (stap: number) => {
    if (stap) {
      setTutorialStap(stap);
    } else {
      setTutorialStap(tutorialStap - 1);
    }
  };

  const getSavedpreviousStap = () => {
    setSavedPreviousStap(localStorage.getItem("previousStap") ?? "");
  };

  useEffect(() => {
    console.log("context", { tutorialStap });

    if (tutorialStap === 0) {
      router.push(`/tutorial/stap${tutorialStap + 1}`);
    } else {
      router.push(`/tutorial/stap${tutorialStap}`);
    }
  }, [tutorialStap]);

  useEffect(() => {
    if (tutorialStap === 2 || tutorialStap === 3) {
      setDisabledNextButton(true);
    } else {
      setDisabledNextButton(false);
    }
  }, [tutorialStap]);

  const value = {
    tutorialStap,
    savedpreviousStap,
    disabledNextButton,
    handleNexttStap,
    handlePreviousStap,
    getSavedpreviousStap,
    setDisabledNextButton,
  };

  return (
    <StapperContext.Provider value={value}>{children}</StapperContext.Provider>
  );
};
