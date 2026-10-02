import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/auth.slice";
import interviewReducer from "../features/interview/store/interview.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    interview: interviewReducer,
  },
});
