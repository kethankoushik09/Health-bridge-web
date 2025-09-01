import { applyMiddleware, configureStore } from "@reduxjs/toolkit";

import doctorsReducer from "../Redux/doctors/doctorSlice";
import specialityReducer from "../Redux/Speciality/specialitySlice";
import userReducer from "../Redux/User/userSlice";
export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    speciality: specialityReducer,
    user:userReducer,
  },
});
