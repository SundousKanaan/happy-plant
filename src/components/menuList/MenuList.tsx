import React from "react";
import $ from "./MenuList.module.scss";
import Button from "@/src/components/Button/Button";
import cs from "classnames";
import { useRouter } from "next/router";

interface MenulistProps {
  handelColeMenu: () => void;
  openCareHelp: () => void;
}

const Menulist: React.FC<MenulistProps> = ({
  handelColeMenu,
  openCareHelp,
}) => {
  const roeter = useRouter();
  return (
    <div className={$.container}>
      <button className={$.xsignal} onClick={handelColeMenu}></button>
      <ul className={$.buttonsList}>
        <li className={$.button}>
          <Button
            text="Community"
            icon="community"
            color="transparent"
            disabled
          />
        </li>
        <li className={$.button}>
          <Button
            text="Mijn Awards"
            icon="awards"
            color="transparent"
            disabled
          />
        </li>
        <li className={$.button}>
          <Button text="Dagboek" icon="book" color="transparent" disabled />
        </li>
        <li className={$.button}>
          <Button
            text="Collectie"
            icon="smallplant"
            color="transparent"
            disabled
          />
        </li>
        <li className={$.button}>
          <Button
            text="Zorghulp"
            icon="Aidbag"
            color="transparent"
            onClick={openCareHelp}
          />
        </li>
      </ul>
    </div>
  );
};

export default Menulist;
