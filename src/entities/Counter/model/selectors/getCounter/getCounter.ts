import { StateScheme } from "App/providers/StoreProvider";

export const getCounter = (state: StateScheme) => state.counter;
