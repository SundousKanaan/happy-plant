import React from "react";
import $ from "./Intro.module.scss";
import Button from "@/src/components/Button/Button";
import { useRouter } from "next/router";
import { Icon } from "@/src/components/Icon/Icon";
import cs from "classnames";

const IntroPage = () => {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const handleStep = () => {
    if (step === 1) {
      setStep(2);
    } else {
      router.push("/tutorial/stap1");
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
          <>
            <p className={$.description}>
              Het is handig om vertrouwd te raken met deze icons voordat je
              HappyPlant gaat gebruiken
            </p>
            <ul className={$.iconsList}>
              <li className={$.icon}>
                <Icon icon="phone" text="Digitale plant" intro />
              </li>
              <li className={$.icon}>
                <Icon icon="house" text="Echt plant" intro />
              </li>
              <li className={$.icon}>
                <Icon icon="sticker" text="Stickers" intro />
              </li>
              <li className={$.icon}>
                <Icon icon="lineview" text="Tijdlijn" intro />
              </li>
            </ul>
          </>
        )}
      </div>
      <div className={$.points}>
        <span className={cs($.point, { [$.dark]: step === 1 })}></span>
        <span className={cs($.point, { [$.dark]: step === 2 })}></span>
      </div>

      <div className={$.buttonsContainer}>
        {step === 2 && (
          <Button text="Terug" color="brown" onClick={() => setStep(1)} />
        )}
        <Button text="Volgende" color="green" onClick={handleStep} />
      </div>
    </section>
  );
};

export default IntroPage;
