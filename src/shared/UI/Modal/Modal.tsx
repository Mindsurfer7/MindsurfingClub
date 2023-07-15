import React, { ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  child?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ className, child }) => {
  return (
    <div className={classNames(cls.Modal, {}, [className as string])}>
      <div className="overlay">
        <div className="content">{child} </div>
      </div>
    </div>
  );
};

export default Modal;
