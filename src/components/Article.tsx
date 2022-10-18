import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {getArticlesId, getUserInfo} from '../api/Axios';
import {addPost} from '../store/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getUser, selectUser } from '../store/userSlice';

export interface theArticle {
    title : string;
    content : string;
    mykey : number;
    authorID : number;
}


const Article = (props : theArticle) => {
  const [result , setResult] = useState(
    ''
  );
  const navigate = useNavigate();
  const thePath = '/articles/' + props.mykey;
  const userState = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(props.authorID !== 0){
      getUserInfo(props.authorID).then(res => {
        setResult(res.name)
     })
    }else{
      dispatch(getUser({targetId : 0}))
      let name = userState.selectedUser?.name;
      setResult(String(name))
    }
  },[dispatch, props.authorID, userState.selectedUser])
  
  return (
    <div>
      <br/>
     {props.mykey}
     <br/>
     <br/>
     <button onClick={()=>navigate(thePath)}>{props.title}</button>
     <br/>
     <br/>
     {result}
     <br/>
     <br/>
    </div>
  )
}
//how to make article component(as it has the html to show it), save it as post in posts store
//map it at the end to show the list
export default Article
