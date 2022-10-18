import {configureStore} from "@reduxjs/toolkit";
import loginSliceReducer from './loginDetail';
import postSliceReducer from './postSlice';
import commentSliceReducer from './commentSlice';
import userSliceReducer from './userSlice';


export const store = configureStore({
    reducer:{
        logIn : loginSliceReducer,
        post : postSliceReducer,
        comment : commentSliceReducer,
        user : userSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;