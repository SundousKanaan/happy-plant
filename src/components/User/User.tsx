import React from "react";
import $ from "./User.module.scss";
import Image from "next/image";
import { StarLine } from "../StarLine/StarLine";
import { useAccount } from "@/src/contexts/account/accountContext";

export const User = () => {
  const { account } = useAccount();
  const userImageSrc = account?.userImage;

  return (
    <div className={$.container}>
      <div className={$.imgContainer}>
        <Image
          src={userImageSrc ?? "/images/user-placeholder-image.svg"}
          alt="background"
          layout="fill"
          className={$.userImage}
        />
      </div>
      <div className={$.nameContainer}>
        <p className={$.name}>
          {account?.userName?.firstName} {account?.userName?.lastName}
        </p>
        <div className={$.starLine}>
          <StarLine />
        </div>
      </div>
    </div>
  );
};
