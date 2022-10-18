import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logIn, logOut} from "../store/loginDetail";
import {useNavigate} from 'react-router-dom';
import {selectPost, addPost, postArticle} from '../store/postSlice';
import Article from './Article';
import Logout from './Logout';
import { getArticleList, getUserList, getUserInfo } from '../api/Axios';
import { useEffect } from 'react';
import { addUser, selectUser, fetchUsers } from '../store/userSlice';
import {AppDispatch} from '../store/store';

interface post {
    title: string,
    content: string,
    author_id: number,
    id : number,
}
interface user {
    name : string,
    id : number, 
    email : string,
    password : string, 
    loggedIn : boolean,
  }

function ArticleList(){    
    const postState = useSelector(selectPost)
    const dispatch = useDispatch();
    const dispatches = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const userState = useSelector(selectUser)
    useEffect(() => {
        getArticleList().then(res => {
            if (!res) {
                return;
            }
            console.log(res);
            res.map((item: post) => dispatch(addPost({title: item.title, content: item.content, authorID: item.author_id, mykey : item.id})))
        });
    }, [postState.posting, postState])
    useEffect(() => {
        getUserList().then(res => {
            if (!res) {
                return;
            }
            res.map((item: user) => dispatch(addUser({name: item.name , email : item.email, id : item.id, loggedIn : item.loggedIn, password : item.password})))
        });
    }, [userState.userList])
    return(
        <div>
            {postState.posting.map((td, key)=>{
                return (
                <Article key = {key} title = {td.title} content = {td.content} mykey = {td.mykey} authorID = {td.authorID}/>
            )
            })}
            <button id= "create-article-button" onClick ={() => navigate('/articles/create')}>Create Article</button>
            <Logout/>
        </div>
    );
}

export default ArticleList;