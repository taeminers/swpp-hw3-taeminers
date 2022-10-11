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
  const result = commentState.comments.filter(item => item.articleID === props.id)
  console.log('props.id', props.id);
  const userState = useSelector(selectUser);
  const User = userState.selectedUser?.name!;

  useEffect(() => {
    getCommentsList().then(res => {
        if (!res) {
            return;
        }
        res.map((item: comment) => dispatch(addComment({content : item.content, authorID : item.author_id, articleID : item.article_id})))
    });
}, [])

  useEffect(() => {
      dispatch(getUser({targetId : props.id}));
  }, [])

  return (
  <div>
    {result.map ((comment, key)=>{
      return (
          <Comment name = {User} content = {comment.content} authorID = {comment.authorID} articleID = {comment.articleID} theKey = {comment.theKey} key = {key}/>
      )
      })}
      
  </div>
)
}

export default CommentList