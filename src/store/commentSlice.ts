import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "./store";

export interface comment { content : string ; theKey: number; authorID : number ; articleID : number;}
export interface postComment {comments : comment[], selectedComment : comment | null}
const initialState : postComment = {
    comments : [],
    selectedComment : null,
}

export const commentSlice = createSlice({
    name : 'comment',
    initialState,
    reducers:{
        addComment : (state, action: PayloadAction<{content : string ; authorID : number; articleID : number}>)=>{
            const newComment = {
                content : action.payload.content,
                articleID : action.payload.articleID,
                theKey : state.comments.length,
                authorID : action.payload.authorID,
            };
            if (state.comments.find(e => e.content === newComment.content)) {
                return;
            }
            state.comments.push(newComment);
        },
        getComment : (state, action : PayloadAction<{targetId : number}>) =>{
            const target = state.comments.find((comment) => comment.theKey === action.payload.targetId);
            state.selectedComment = target ?? null;
        },
    }
})

export const selectComment = (state: RootState) => state.comment;
export const {addComment, getComment} = commentSlice.actions;
export default commentSlice.reducer;