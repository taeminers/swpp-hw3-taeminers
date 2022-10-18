import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "./store";
import { useActionData } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { useSelector } from 'react-redux';
import { getUserList } from '../api/Axios';

export interface user {name : string ; id : number; email : string; password : string; loggedIn : boolean }
export interface users {userList : user[], selectedUser : user | null}
const initialState : users = {
    userList : [],
    selectedUser : null,
}

export const postUser = createAsyncThunk("userSlice/postUser", 
    async(user: Pick<user, "name" | "email" | "password"| "id" | "loggedIn">, {dispatch}) =>{
            getUserList().then(res =>{
                res.fil
            })
            const response = await axios.post("/api/user/", user);
            dispatch(userActions.addUser(response.data));
        
    }
);

export const fetchUsers = createAsyncThunk("userSlice/fetchUsers", async() =>{
    const repsonse = await axios.get<user[]>("/api/user/");
    return repsonse.data;
}  
);

export const fetchUser = createAsyncThunk("userSlice/fetchUser", 
    async(id : user["id"], {dispatch}) =>{
        const response = await axios.get(`/api/user/${id}`);
        return response.data ?? null;
})

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        addUser : (state, action: PayloadAction<{name: string; email : string; password : string; loggedIn : boolean; id : number}>) =>{
            const newUser = {
                name : action.payload.name,
                email : action.payload.email,
                password : action.payload.password,
                loggedIn : true,
                id : action.payload.id,
            }
            if (state.userList.find(e => e.id === newUser.id)){
                return;
            }
            state.userList.push(newUser);
        },
        getUser : (state, action: PayloadAction<{targetId : number}>) =>{
            const target = state.userList.find((user) => user.id === action.payload.targetId);
            state.selectedUser = target ?? null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state,action) => {
            state.userList = action.payload;
        });
        builder.addCase(fetchUser.fulfilled, (state,action) =>{
            state.selectedUser = action.payload;
        });
        builder.addCase(postUser.rejected, (state,action) =>{
            console.error(action.error)
        });
    }
})

export const selectUser = (state: RootState) => state.user;
export const {addUser, getUser} = userSlice.actions;
export default userSlice.reducer;
export const userActions = userSlice.actions;