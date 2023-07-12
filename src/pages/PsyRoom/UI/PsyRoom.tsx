import React, { useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./PsyRoom.module.scss";

interface PsyRoomProps {
  className?: string;
}

const PsyRoom: React.FC<PsyRoomProps> = ({ className }) => {
  const [message, setMessage] = useState("");
  const [mesArray, setMesArray] = useState<string[]>([]);

  const sendMessage = () => {
    setMesArray([...mesArray, message]);
    setMessage("");
  };
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
  return (
    <div className={classNames(cls.PsyRoom, {}, [className as string])}>
      <h1>Speak to psychologist</h1>
      <div className="chat">
        {mesArray.map((m) => (
          <div>{m}</div>
        ))}
      </div>
      <div className="send">
        <textarea onChange={handleChange} value={message} />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
};

export default PsyRoom;
