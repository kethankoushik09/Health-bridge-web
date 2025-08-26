import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:null,
    reducers:{
        setUser:(state,action)=>{
            return action.payload;
        },
        removeUser:()=>{
            return null;
        }
    }
})

const userReducer = userSlice.reducer;

export const {setUser, removeUser} = userSlice.actions;

export default userReducer;