import { configureStore } from "@reduxjs/toolkit";

import doctorsReducer from "../Redux/doctors/doctorSlice";
import specialityReducer from "../Redux/Speciality/specialitySlice";
export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    speciality: specialityReducer
  },
});
