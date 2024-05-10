import React from "react";
import Image from "next/image";
import $ from "./StarLine.module.scss";
import { useAccount } from "@/src/contexts/account/accountContext";

export const StarLine = () => {
  const { account } = useAccount();

  return (
    <div className={$.container}>
      <div className={$.imgContainer}>
        <Image src="/images/icons/star.svg" alt="star line" layout="fill" />
      </div>
      <p className={$.number}>{account?.stars}</p>
      <div className={$.line}></div>
    </div>
  );
};
