import React, { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Notification.module.scss';

interface NotificationProps {
  className?: string;
  message?: string;
}

// /: React.FC<NotificationProps>

const Notification = forwardRef((props, ref) => {
  const [showNote, setShowNote] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowNote(true);
      setTimeout(() => {
        setShowNote(false);
      }, 3000);
    },
  }));
  return (
    <div
      id={showNote ? 'show' : 'hide'} //@ts-ignore
      className={classNames(cls.Notification, {}, [props.className])}
    >
      ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    </div>
  );
});

export default Notification;
