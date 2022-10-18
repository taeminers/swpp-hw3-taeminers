import React from 'react'
import {configureStore, PreloadedState} from '@reduxjs/toolkit';
import {render, RenderOptions} from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from "react-redux";
import { AppStore, RootState } from "../store/store";
import commentSliceReducer from "../store/commentSlice";
import userSliceReducer from "../store/userSlice";
import postSliceReducer from '../store/postSlice';
import loginSliceReducer from "../store/loginDetail"

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
  }


  export const getMockStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
      reducer: 
      { post: postSliceReducer, user : userSliceReducer, comment: commentSliceReducer, logIn : loginSliceReducer },
      preloadedState,
    });
  };

  export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState,
        store = getMockStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
  ){
    function Wrapper({ children }: PropsWithChildren): JSX.Element {
      return <Provider store={store}>{children}</Provider>;
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
