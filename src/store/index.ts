import { configureStore } from "@reduxjs/toolkit";
import dataSliceReducer from "./data-slice";
import logicSliceReducer from "./logic-slice";
import workingDataReducer from "./workingData-slice";

const store = configureStore({
  reducer: {
    data: dataSliceReducer,
    logic: logicSliceReducer,
    workingData: workingDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
