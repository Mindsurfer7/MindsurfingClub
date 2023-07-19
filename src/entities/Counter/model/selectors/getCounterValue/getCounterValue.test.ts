import { DeepPartial } from "@reduxjs/toolkit";
import { StateScheme } from "App/providers/StoreProvider";
import { getCounterValue } from "./getCounterValue";

describe("getCounter", () => {
  test("should return value", () => {
    const state: DeepPartial<StateScheme> = {
      counter: { value: 10 },
    };
    expect(getCounterValue(state as StateScheme)).toEqual(10);
  });
});
