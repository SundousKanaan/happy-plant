import React from "react";
import $ from "./Award.module.scss";
import Image from "next/image";
import Button from "../Button/Button";

interface AwardProps {
  award: string;
  text: string;
  handelClaim: () => void;
}

export const Award: React.FC<AwardProps> = ({ award, text, handelClaim }) => {
  return (
    <div className={$.container}>
      <h1 className={$.title}>Nieuwe Prijs</h1>
      <div className={$.awardreviewContainer}>
        <div className={$.awardImage}>
          <Image
            src={`/images/${award}.svg`}
            alt={`${award}award`}
            layout="fill"
            className={$.image}
          />
        </div>
        <p className={$.typeAward}>Nieuwe {text}</p>
      </div>
      <p className={$.description}>
        Gefeliciteerd, je hebt een nieuwe {text} ontvangen om je eerste stappen
        in de verzorging te voltooien!
      </p>
      <div className={$.button}>
        <Button text="Claim" color="green" onClick={handelClaim} />
      </div>
    </div>
  );
};
