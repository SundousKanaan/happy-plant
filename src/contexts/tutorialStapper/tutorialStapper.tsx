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

  const [showAward, setShowAward] = useState<boolean>(false);

  // this function is used to go to the next tutorial step
  const handleNexttStap = () => {
    if (tutorialStap + 1 >= 5) {
      console.log("tutorialStap + 1 >= 5");
      setShowAward(true);
    } else {
      setTutorialStap(tutorialStap + 1);
      router.push(`/tutorial/stap${tutorialStap + 1}`);
    }
  };

  // this function is used to go to the previous tutorial step
  const handlePreviousStap = () => {
    setTutorialStap(tutorialStap - 1);
    router.push(`/tutorial/stap${tutorialStap - 1}`);
  };

  // this function is used to go to a specific tutorial step
  const handleCustomStap = (stap: number) => {
    setTutorialStap(stap);
    router.push(`/tutorial/stap${stap}`);
  };

  // useEffect(() => {
  //   if (tutorialStap === 2 || tutorialStap === 3) {
  //     setDisabledNextButton(true);
  //     console.log("--tutorialStapper:", tutorialStap);
  //   } else {
  //     setDisabledNextButton(false);
  //   }
  // }, [tutorialStap]);

  const value = {
    tutorialStap,
    savedpreviousStap,
    showAward,
    handleNexttStap,
    handlePreviousStap,
    handleCustomStap,
  };

  return (
    <StapperContext.Provider value={value}>{children}</StapperContext.Provider>
  );
};
