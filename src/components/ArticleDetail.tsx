import React, { useEffect , useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {selectPost} from '../store/postSlice';
import  Article from './Article';
import {getPost} from '../store/postSlice';
import {useParams} from 'react-router-dom';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {addComment, getComment, selectComment} from '../store/commentSlice';
import {selectUser, getUser} from '../store/userSlice';
import CommentList from './CommentList';
import comment from '../store/commentSlice';

const ArticleDetail = () => {
const postState = useSelector(selectPost);
const dispatch = useDispatch();
const [inputs, setInputs] = useState({
  content : ''
});
const {content} = inputs;
const onChange = (e:any) =>{
  const {value, name} = e.target;
  setInputs({
      ...inputs,
      [name] : value
  });
};
//made comment

const {id}  = useParams();
useEffect(()=>{
  dispatch(getPost({targetId : Number(id)}));
}, [dispatch, id]);
const navigate = useNavigate();
const gotoList = ()=>{
    navigate('/articles')
}
const authorID = 0;
const articleID = postState.selectedPost?.mykey!;
const theComment = {content, authorID, articleID};
const postComment = ()=>{
    dispatch(addComment(theComment));
}
const thePath = '/articles/' + id + '/edit';
return (
    <div>
      <h1 id = 'article-author'>{postState.selectedPost?.authorID}</h1>
      <h1 id = 'article- title'>{postState.selectedPost?.title}</h1>
      <h1 id = 'article-content'>{postState.selectedPost?.content}</h1>
      <br/>
      <CommentList id = {articleID}/>
      <br/>
      <button id='edit-article-button' onClick = {()=> navigate(thePath)}>edit article</button>
      <button id='delete-article-button'>delete article</button>
      <br/>
      <br/>
      <textarea id = 'new-comment-content-input' placeholder = 'new comment' name = 'content' value = {content} onChange = {onChange}></textarea>
      <br/>
      <br/>
      <button id='confirm-create-comment-button' onClick = {postComment} disabled={!content}>confirm comment</button>
      <button id ='edit-comment-button'>edit comment</button>
      <button id ='delete-comment-button'>delete comment</button>
      
      <button id='back-detail-article-button' onClick = {gotoList}>back-detail-article</button>
      <br/>
      <br/>
      <Logout/>
    </div>
  )
};

export default ArticleDetail