import React from "react";
import PopUP from "@/src/components/PopUp/PopUp";
import CareHelp from "@/src/components/CareHelp/CareHelp";
import Button from "@/src/components/Button/Button";
import $ from "./careHelp.module.scss";

const index = () => {
  return (
    <>
      <PopUP
        isOpen={true}
        pupUpType="page"
        title="ZorgHulp"
        backgroundColor="brown"
      >
        <CareHelp currentPath="/careHelp" />
      </PopUP>
    </>
  );
};

export default index;
