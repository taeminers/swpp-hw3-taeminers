import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';



export const loginSlice = createSlice({
    name: "login",
    initialState: {
        loggedIn : false
    },
    reducers: {
        logIn : (state) =>{
            state.loggedIn = !state.loggedIn;
        },
        logOut : (state) => {
            state.loggedIn = !state.loggedIn;
        }
    }
});

export const { logIn, logOut} = loginSlice.actions;
export default loginSlice.reducer;
