import React from 'react'
import {useSelector} from 'react-redux';
import {selectUser} from '../store/userSlice';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getUser} from '../store/userSlice';

export interface theComment {
    content : string,
    theKey: number,
    authorID : number, //user.myKey
    articleID : number //post.myKey
    name : string;
}

const Comment = (props : theComment) => {
    const dispatch = useDispatch();
    //const userState = useSelector(selectUser);
   // dispatch(getUser({targetId : Number(props.authorID)}));
    
    //const User = userState.selectedUser?.name;
  return (
    <div>
     <br/>
      {props.content}
      <br/>
      {props.name}
      <br/>
      {props.name === 'taemin' && (
        <>
        <button id ='edit-comment-button'>edit comment</button>
        <button id ='delete-comment-button'>delete comment</button>
        </>
        )}
    </div>
  )
}

export default Comment
