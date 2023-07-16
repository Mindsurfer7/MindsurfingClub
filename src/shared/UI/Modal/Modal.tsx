import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Modal.module.scss";
import Portal from "../Portal/Portal";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isVisible?: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { className, children, isVisible, onClose } = props;

  const [isClosed, setClosure] = useState(false);

  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const mods: Record<string, boolean | undefined> = {
    [cls.visible]: isVisible,
    [cls.isClosing]: isClosed,
  };

  const closeHandler = useCallback(() => {
    if (onClose) {
      onClose();
      timeRef.current = setTimeout(() => {
        onClose();
        setClosure(false);
      }, 300);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler]
  );

  useEffect(() => {
    if (isVisible) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isVisible, onKeyDown]);

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content}>{children} </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;

// {classNames(cls.content, {
//     [cls.contentVisible]: isVisible,
//   })}
