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


interface user {
  name : string,
  myKey : number, 
  email : string,
  password : string, 
  loggedIn : boolean,
}

const Article = (props : theArticle) => {
  const [result , setResult] = useState(
    null
  );

  const navigate = useNavigate();
  const thePath = '/articles/' + props.mykey;
  const dispatch = useDispatch();
  const userState = useSelector(selectUser);
  
  getUserInfo(props.authorID).then(res => {
    if (!res) {
        return;
    }
    setResult(res.name)
});


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
