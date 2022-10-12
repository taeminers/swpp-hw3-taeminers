import React, {useState} from 'react'
import {useSelector} from 'react-redux';
import {selectUser} from '../store/userSlice';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getUser} from '../store/userSlice';
import {getArticlesId, getUserInfo, getCommentsId, getUserList, getCommentsList} from '../api/Axios';

export interface theComment {
    content : string;
    theKey: number;
    authorID : number; 
    articleID : number; 
}

const Comment = (props : theComment) => {
    const dispatch = useDispatch();
    const [result , setResult] = useState(
      null
    );
    
  return (
    <div>
     <br/>
      {props.content}
      <br/>
      {result}
      <br/>
      {
        <>
        <button id ='edit-comment-button'>edit comment</button>
        <button id ='delete-comment-button'>delete comment</button>
        </>
      }
    </div>
  )
}

export default Comment
