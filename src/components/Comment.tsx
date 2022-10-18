import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import {selectUser} from '../store/userSlice';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getUser} from '../store/userSlice';
import {getArticlesId, getUserInfo, getCommentsId, getUserList, getCommentsList} from '../api/Axios';
import { selectComment } from '../store/commentSlice';

export interface theComment {
    content : string;
    theKey: number;
    authorID : number; 
    articleID : number; 
}

const Comment = (props : theComment) => {
    const dispatch = useDispatch();
    const [result , setResult] = useState(
      ''
    );
    const userState = useSelector(selectUser);
    const commentState =useSelector(selectComment);
    const [isUser, setisUser] = useState(false)
  useEffect(()=>{
    if(props.authorID !== 0){
      getUserInfo(props.authorID).then(res=>{
        setResult(res.name)
      })
    }else{
      dispatch(getUser({targetId : 0}))
      setResult(String(userState.selectedUser?.name))
    }
  },[userState.selectedUser] )
  useEffect(()=>{
    if(props.authorID == 0){
      setisUser(true)
    }else{
      setisUser(false)
    }
  }, [commentState.comments])

  if(isUser) {return (
    <div>
     <br/>
      {props.content}
      <br/>
      <br/>
      {result}
      <br/>
      <br/>
      {
        <>
        <button id ='edit-comment-button' >edit comment</button>
        <button id ='delete-comment-button'>delete comment</button>
        </>
      }
    </div>
  )} else return(
    <div>
     <br/>
      {props.content}
      <br/>
      <br/>
      {result}
      <br/>
      <br/>
    </div>
  )
}

export default Comment
