import { applyMiddleware, configureStore } from "@reduxjs/toolkit";

import doctorsReducer from "../Redux/doctors/doctorSlice";
import specialityReducer from "../Redux/Speciality/specialitySlice";
import userReducer from "../Redux/User/userSlice";
import appointmentReducer from "../Redux/Appointments/appointmentsSlice"
export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    speciality: specialityReducer,
    user:userReducer,
    appointments:appointmentReducer
  },
});
