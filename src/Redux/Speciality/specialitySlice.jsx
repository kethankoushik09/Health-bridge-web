import { createSlice } from "@reduxjs/toolkit";
import { specialityList } from "./specialityData.jsx"

const specialitySlice = createSlice({
  name: "speciality",
  initialState: {
    list: specialityList,
  },

});
export default specialitySlice.reducer;
