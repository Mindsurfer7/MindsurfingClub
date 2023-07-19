import {
  CounterScheme,
  counterReducer,
  decrement,
  increment,
} from "./counterSlice";

describe("counter reducer", () => {
  test("decrement", () => {
    const state: CounterScheme = { value: 10 };

    expect(counterReducer(state, decrement())).toEqual({ value: 9 });
  });
  test("increment", () => {
    const state: CounterScheme = { value: 10 };

    expect(counterReducer(state, increment())).toEqual({ value: 11 });
  });
  test("empty state", () => {
    expect(counterReducer(undefined, increment())).toEqual({ value: 1 });
  });
});
