import { createSlice } from "@reduxjs/toolkit";
import { specialityList } from "./specialityData"

const specialitySlice = createSlice({
  name: "speciality",
  initialState: {
    list: specialityList,
  },

});
export default specialitySlice.reducer;
