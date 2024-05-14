import React from "react";
import { Icon } from "@/src/components/Icon/Icon";
import cs from "classnames";
import $ from "./stap2.module.scss";

interface stapProps {
  handelOpenOptionsList: () => void;
  openOptionsList: boolean;
}

const Stap2: React.FC<stapProps> = ({
  handelOpenOptionsList,
  openOptionsList,
}) => {
  return (
    <ul className={$.iconsList}>
      <li className={cs($.icon)}>
        <button
          className={cs($.iconButton, { [$.selected]: openOptionsList })}
          onClick={handelOpenOptionsList}
        >
          <Icon icon="flower" text="Bloemen" />
        </button>
      </li>
      <li className={cs($.icon, $.disabled)}>
        <button className={$.iconButton} disabled>
          <Icon icon="Leafyplant" text="Bladplanten" />
        </button>
      </li>
      <li className={cs($.icon, $.disabled)}>
        <button className={$.iconButton} disabled>
          <Icon icon="succulent" text="Vetplanten" />
        </button>
      </li>
    </ul>
  );
};

export default Stap2;
