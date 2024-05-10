import { useEffect, useState } from "react";

export const useStepper = () => {
  const [previousStep, setPreviousStep] = useState<string>("");
  const [savedpreviousStep, setSavedPreviousStep] = useState<string | null>();

  const savePreviousStep = (previousStep: string) => {
    localStorage.setItem("previousStep", previousStep);
  };

  const getSavedpreviousStep = () => {
    setSavedPreviousStep(localStorage.getItem("previousStep"));
  };

  useEffect(() => {
    if (previousStep !== "") {
      savePreviousStep(previousStep);
    }
  }, [previousStep]);

  return {
    previousStep,
    savedpreviousStep,
    setPreviousStep,
    getSavedpreviousStep,
  };
};
