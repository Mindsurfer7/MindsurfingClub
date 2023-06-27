import { useState } from "react";
//import "./counter.scss";
import CSS from "./Counter.module.scss";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const inc = () => {
    setCount(count + 1);
  };

  return (
    <div className={CSS.btn}>
      <button onClick={inc}>+</button>
      <div className="num">{count}</div>
    </div>
  );
};
