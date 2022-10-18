import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { addComment, selectComment } from '../store/commentSlice';
import Comment from './Comment';
import {selectUser, getUser} from '../store/userSlice';
import { getCommentsList } from '../api/Axios';

interface comment{
content : string,
  author_id : number,
  article_id : number,
}
interface IProps {
  id : number
}
const CommentList = (props : IProps) => {
  const dispatch = useDispatch();
  const commentState = useSelector(selectComment);
  let result = commentState.comments.filter(item => item.articleID === props.id)
  useEffect(() => {
    getCommentsList().then(res => {
        if (!res) {
            return;
        }
        res.map((item: comment) => dispatch(addComment({content : item.content, authorID : item.author_id, articleID : item.article_id})))
        result = commentState.comments.filter(item => item.articleID === props.id)      
    });
}, [commentState.comments])

  return (
  <div>
    {result.map ((td, key)=>{
      return (
          <Comment content = {td.content} authorID = {td.authorID} articleID = {td.articleID} theKey = {td.theKey} key = {key}/>
      )
      })}
      
  </div>
)
}

export default CommentList