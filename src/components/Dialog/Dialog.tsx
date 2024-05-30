import React from "react";
import $ from "./Dialog.module.scss";
import cs from "classnames";

interface DialogProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  backgroundColor?: string;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  onClose,
  children,
  backgroundColor,
}) => {
  if (!isOpen) return null;

  return (
    <div className={$.dialogContainer} onClick={onClose}>
      <h2 className={cs($.title, { [$.withoutTitle]: !title })}>{title}</h2>
      <div
        className={cs($.content, { [$.withoutTitle]: !title })}
        style={{ backgroundColor }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;
