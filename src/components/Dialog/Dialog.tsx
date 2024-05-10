import React from "react";
import $ from "./Dialog.module.scss";

interface DialogProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className={$.dialogContainer} onClick={onClose}>
      <h2 className={$.title}>{title}</h2>
      <div className={$.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
