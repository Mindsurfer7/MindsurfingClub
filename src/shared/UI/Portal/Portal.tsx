import React, { ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Portal.module.scss";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

const Portal: React.FC<PortalProps> = ({
  children,
  element = document.body,
}) => {
  return createPortal(children, element);
};

export default Portal;
