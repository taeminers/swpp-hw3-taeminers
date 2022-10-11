import React from 'react'
import { useNavigate } from 'react-router-dom';

export interface theArticle {
    title : string;
    content : string;
    mykey : number;
    authorID : number;
}


const Article = (props : theArticle) => {
  const navigate = useNavigate();
  const thePath = '/articles/' + props.mykey;
  return (
    <div>
      <br/>
     {props.authorID}
     <br/>
     <br/>
     <button onClick={()=>navigate(thePath)}>{props.title}</button>
     <br/>
     <br/>
     {props.content} 
     <br/>
     <br/>
    </div>
  )
}
//how to make article component(as it has the html to show it), save it as post in posts store
//map it at the end to show the list
export default Article
