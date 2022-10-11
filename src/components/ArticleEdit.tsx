import React from 'react'
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getPost, selectPost} from '../store/postSlice';

const ArticleEdit = () => {
const {id}  = useParams();
const dispatch= useDispatch();
//dispatch(getPost({targetId : Number(id)}))
const postState = useSelector(selectPost);
const as = postState.selectedPost?.content;
  return (
    <div>
        {as}
    </div>
  )
}

export default ArticleEdit