import React from "react";
import $ from "./Intro.module.scss";
import Button from "@/src/components/button/Button";
import { useRouter } from "next/router";

const IntroPage = () => {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const handleStep = () => {
    if (step === 1) {
      setStep(2);
    } else {
      router.push("/home");
    }
  };
  return (
    <section className={$.mainContainer}>
      <div className={$.textContainer}>
        {step === 1 ? (
          <>
            <p className={$.description}>Welkom bij HappyPlant.</p>
            <p className={$.description}>Ik ben Bud, jouw zorgassistent.</p>
            <p className={$.description}>
              Ik help je met het verzorgen van je digitale en levende planten.
              Leuk je te ontmoeten!
            </p>
          </>
        ) : (
          <p>test step 2</p>
        )}
      </div>
      <div className={$.points}>
        <span className={$.point}></span>
        <span className={$.point}></span>
      </div>

      <div className={$.buttonsContainer}>
        {step === 2 && (
          <Button text="Terug" color="bruin" onClick={() => setStep(1)} />
        )}
        <Button text="Volgende" color="green" onClick={handleStep} />
      </div>
    </section>
  );
};

export default IntroPage;
