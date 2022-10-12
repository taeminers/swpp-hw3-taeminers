import React from 'react'
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getPost, selectPost} from '../store/postSlice';
import {getArticlesId} from '../api/Axios';

const ArticleEdit = () => {
const {id}  = useParams();
getArticlesId(Number(id)).then(res => {
  if (!res) {
      return;
  }
  console.log(res)
});
  return (
    <div>
        
    </div>
  )
}

export default ArticleEdit