import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logIn, logOut} from "../store/loginDetail";
import {useNavigate} from 'react-router-dom';
import {selectPost, addPost} from '../store/postSlice';
import Article from './Article';
import Logout from './Logout';
import { getArticleList } from '../api/Axios';
import { useEffect } from 'react';

interface post {
    title: string,
    content: string,
    author_id: number,
}

function ArticleList(){    
    const postState = useSelector(selectPost)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getArticleList().then(res => {
            if (!res) {
                return;
            }
            res.map((item: post) => dispatch(addPost({title: item.title, content: item.content, authorID: item.author_id})))
        });
    }, [])

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