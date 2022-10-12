import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "./store";
import { useActionData } from 'react-router-dom';

export interface user {name : string ; myKey : number; email : string; password : string; loggedIn : boolean }
export interface users {userList : user[], selectedUser : user | null}
const initialState : users = {
    userList : [],
    selectedUser : null,
}
export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        addUser : (state, action: PayloadAction<{name: string; email : string; password : string; loggedIn : boolean; myKey : number}>) =>{
            const newUser = {
                name : action.payload.name,
                email : action.payload.email,
                password : action.payload.password,
                loggedIn : true,
                myKey : action.payload.myKey,
            }
            if (state.userList.find(e => e.myKey === newUser.myKey)) {
                return;
            }
            state.userList.push(newUser);
        },
        getUser : (state, action: PayloadAction<{targetId : number}>) =>{
            const target = state.userList.find((user) => user.myKey === action.payload.targetId);
            state.selectedUser = target ?? null;
        }
    }
})

export const selectUser = (state: RootState) => state.user;
export const {addUser, getUser} = userSlice.actions;
export default userSlice.reducer;