import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "./store";

export interface posts { title : string ; content : string; mykey : number; authorID : number}
export interface postState { posting : posts[], selectedPost : posts | null}
const initialState : postState = {
posting : [],
selectedPost : null,
}
export const postSlice = createSlice({
    name : "post",
    initialState,
    reducers: {
        addPost : (state, action: PayloadAction<{title : string ; content : string ; authorID : number; mykey : number}>) => {
            const newPost = {
                title : action.payload.title,
                content: action.payload.content,
                authorID : action.payload.authorID,
                mykey : action.payload.mykey,
            };

            if (state.posting.find(e => e.title === newPost.title)) {
                return;
            }
            state.posting.push(newPost);
        },
        getPost : (state, action: PayloadAction<{targetId : number}>)=> {
            const target = state.posting.find((post) => post.mykey === action.payload.targetId);
            state.selectedPost = target ?? null
        }
    }
})

export const selectPost = (state: RootState) => state.post;
export const {addPost, getPost} = postSlice.actions;
export default postSlice.reducer; 