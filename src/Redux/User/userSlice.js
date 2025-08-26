import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: JSON.parse(localStorage.getItem("user")) || null,   
  isLogin: localStorage.getItem("isLogin")|| false      
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;   
      state.isLogin = true;
      localStorage.setItem("isLogin", true);
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.data = null;
      state.isLogin = false;
      localStorage.removeItem("isLogin");
      localStorage.removeItem("user");
    }
  }
});

const userReducer = userSlice.reducer;

export const { setUser, removeUser } = userSlice.actions;

export default userReducer;
