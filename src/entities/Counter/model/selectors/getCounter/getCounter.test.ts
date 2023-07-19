import { DeepPartial } from "@reduxjs/toolkit";
import { getCounter } from "./getCounter";
import { StateScheme } from "App/providers/StoreProvider";

describe("getCounter", () => {
  test("should return value", () => {
    const state: DeepPartial<StateScheme> = {
      counter: { value: 10 },
    };
    expect(getCounter(state as StateScheme)).toEqual({ value: 10 });
  });
});
