import React from "react";
import Image from "next/image";
import $ from "./stap3.module.scss";

interface stapProps {}

const Stap3: React.FC<stapProps> = ({}) => {
  return (
    <>
      <div className={$.fakePLant}></div>
      <Image
        src="/images/icons/pot-default.svg"
        alt="stap3"
        className={$.potImage}
        layout="fill"
      />
    </>
  );
};

export default Stap3;
