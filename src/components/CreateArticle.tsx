import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import {addPost, posts, getPost} from '../store/postSlice';
import {selectPost} from '../store/postSlice';
import Article from './Article';
import ArticleDetail from './ArticleDetail';
import Logout from './Logout';
import { selectUser, getUser } from '../store/userSlice';
import { exit } from 'process';

const CreateArticle = () => {
    const [inputs, setInputs] = useState({
        title: '',
        content: ''
    })
    const {title, content} = inputs
    const onChange = (e:any) =>{
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    };
    const postState = useSelector(selectPost);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authorID = 0;
    const thePost = {title, content, authorID};
    let [previewMode, setpreviewMode] = useState(false)
    const num = postState.posting.length;

    const postings = () =>{
        if(thePost.title !== '' && thePost.content !== ''){
            dispatch(addPost(thePost))
            navigate("/articles/" + num)
        } 
    }
    
    const detailInCreate = () =>{
        setpreviewMode(true);
    }
    const detailInPreview = ()=>{
        setpreviewMode(false);
    }
    if(previewMode){
        return(
            <div>
                <div>
                {title}
                <br/>
                {content}
                </div>
                <button id="back-create-article-button" onClick={()=>navigate('/articles')}>back</button>
                <button id ="confirm-create-article-button" onClick ={postings} disabled = {!title || !content}>create</button>
                <button id="preview-tab-button">preview</button>
                <button id ="write-tab-button" onClick={detailInPreview}>write</button> 
                <Logout/>
            </div>
        )
    }
    else
    return(
        <div>
            <div>
                Title:   
                <input name = 'title' id = "article-title-input" onChange = {onChange} value={title} />
                <br/>
            </div>
            <div>
                <br/>
                Content:
                <input name = 'content' id ="article-content-input" onChange = {onChange} value = {content}/> 
            </div>
            <br/>
            <br />
            <button id="back-create-article-button" onClick={()=>navigate('/articles')}>back</button>
            <button id ="confirm-create-article-button" onClick ={postings} disabled = {!title || !content}>create</button>
            <button id="preview-tab-button" onClick = {detailInCreate} >preview</button>
            <button id ="write-tab-button">write</button>
            <Logout/>
        </div>
    )
}

export default CreateArticle
