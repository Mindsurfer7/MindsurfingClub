import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Counter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../model/slice/counterSlice";
import { StateScheme } from "App/providers/StoreProvider/config/stateScheme";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";

interface CounterProps {}

const Counter: React.FC<CounterProps> = ({}) => {
  const counterValue = useSelector(getCounterValue);
  const dispatch = useDispatch();

  const inc = () => {
    dispatch(increment());
  };
  const dec = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <h1 data-testid="valueTitle">{counterValue}</h1>
      <button data-testid="incbtn" onClick={inc}>
        inc
      </button>
      <button data-testid="decbtn" onClick={dec}>
        dec
      </button>
    </div>
  );
};

export default Counter;
