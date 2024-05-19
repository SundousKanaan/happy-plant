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
  const [tutorialStap, setTutorialStap] = useState(1);
  const [savedpreviousStap, setSavedPreviousStap] = useState<string>("");
  const [disabledNextButton, setDisabledNextButton] = useState<boolean>(false);

  const handleNexttStap = (stap: number) => {
    setTutorialStap(tutorialStap + 1);
    router.push(`/tutorial/stap${tutorialStap + 1}`);
  };

  const handlePreviousStap = () => {
    setTutorialStap(tutorialStap - 1);
    router.push(`/tutorial/stap${tutorialStap - 1}`);
  };

  const handleCustomStap = (stap: number) => {
    setTutorialStap(stap);
  };

  // useEffect(() => {}, [tutorialStap]);

  const handleDisableNextButton = (value: boolean) => {
    setDisabledNextButton(value);
  };

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
    setDisabledNextButton,
    handleCustomStap,
    handleDisableNextButton,
  };

  return (
    <StapperContext.Provider value={value}>{children}</StapperContext.Provider>
  );
};
