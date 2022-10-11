/* eslint-disable */

import './App.css';
import React , {useEffect} from "react";
import Login from './components/Login';
import{Routes, Route, Navigate, BrowserRouter as Router  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArticleList from './components/ArticleList';
import ProtectedRoutes from "./routes/ProtectedRoutes";
import CreateArticle from './components/CreateArticle';
import ArticleDetail from './components/ArticleDetail';
import {selectPost, addPost} from './store/postSlice';
import ArticleEdit from './components/ArticleEdit';
import { getArticleList } from './api/Axios';

interface post {
  title: string,
  content: string,
  author_id: number,
}

function App() {
  const {loggedIn} = useSelector( (state : any) => state.logIn);
  const postState = useSelector(selectPost)
  const dispatch = useDispatch();
  const thepath = '/articles/' + postState.posting.length;

  return (
    <Router>
      <div className="App">
        <h1>SWPP HW3</h1>
        <Routes>
          <Route element ={<ProtectedRoutes />}>
              <Route path ='/articles' element ={<ArticleList/>}/>
              <Route path ='/articles/create' element ={<CreateArticle />}/>
              <Route path = '/articles/:id'  element = {<ArticleDetail />}/>
              <Route path = '/articles/:id/edit' element = {<ArticleEdit/>}/>
          </Route>
          <Route path = '/' element={<Navigate replace to="/login"/>}/>
          <Route path = '/login' element ={loggedIn ? <ArticleList/> : <Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
