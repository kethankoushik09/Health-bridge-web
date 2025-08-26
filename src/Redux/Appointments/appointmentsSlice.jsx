// src/redux/appointmentsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    list: [],
  },
  reducers: {
    addAppointment: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { addAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
