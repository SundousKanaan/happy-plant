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

  // this function is used to go to the next tutorial step
  const handelNexttStap = () => {
    if (tutorialStap + 1 < 5) {
      setTutorialStap(tutorialStap + 1);
      router.push(`/tutorial/stap${tutorialStap + 1}`);
    }
  };

  // this function is used to go to the previous tutorial step
  const handelPreviousStap = () => {
    setTutorialStap(tutorialStap - 1);
    router.push(`/tutorial/stap${tutorialStap - 1}`);
  };

  // this function is used to go to a specific tutorial step
  const handelCustomStap = (stap: number) => {
    setTutorialStap(stap);
    router.push(`/tutorial/stap${stap}`);
  };

  const value = {
    tutorialStap,
    savedpreviousStap,
    handelNexttStap,
    handelPreviousStap,
    handelCustomStap,
  };

  return (
    <StapperContext.Provider value={value}>{children}</StapperContext.Provider>
  );
};
