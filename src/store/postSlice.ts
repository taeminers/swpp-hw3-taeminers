import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "./store";
import axios from 'axios';

export interface posts { title : string ; content : string; mykey : number; authorID : number};
export interface postState { posting : posts[], selectedPost : posts | null};


export const postArticle = createAsyncThunk("postSlice/postArticle", 
    async(article: Pick<posts, "title" | "content" | "authorID">, {dispatch}) =>{
        const response = await axios.post("/api/articles/", article);
        dispatch(postActions.addPost(response.data));
    }
);

export const fetchPosts = createAsyncThunk("postSlice/fetchPosts", async() =>{
    const repsonse = await axios.get<posts[]>("/api/articles/");
    return repsonse.data;
}  
);

export const fetchPost = createAsyncThunk("postSlice/fetchPost", 
    async(id : posts["mykey"], {dispatch}) =>{
        const response = await axios.get(`/api/articles/${id}`);
        return response.data ?? null;
})

export const deletePost = createAsyncThunk(
    "postSlice/deletePost",
    async (id: posts["mykey"], { dispatch }) => {
      await axios.delete(`/api/articles/${id}/`);
      dispatch(postActions.deletePost({ targetId: id }));
    }
  );

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
        },
        deletePost : (state,action: PayloadAction<{targetId: number}>)=>{
            const deleted = state.posting.filter((article)=>{
                return article.mykey != action.payload.targetId;
            });
            state.posting = deleted;
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchPosts.fulfilled, (state,action) => {
            state.posting = action.payload;
        });
        builder.addCase(fetchPost.fulfilled, (state,action) =>{
            state.selectedPost = action.payload;
        });
        builder.addCase(postArticle.rejected, (state,action) =>{
            console.error(action.error)
        });
    }
})

export const selectPost = (state: RootState) => state.post;
export const {addPost, getPost} = postSlice.actions;
export default postSlice.reducer; 
export const postActions = postSlice.actions;