import { constants } from 'buffer';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, Route, useNavigate} from 'react-router-dom';
import ArticleList from './ArticleList';
import {logIn, logOut} from "../store/loginDetail";
import {addUser, selectUser} from '../store/userSlice';

function Login(){
    const [inputs, setInputs] = useState({ 
        email : '', 
        password : ''
    });

    
    const { email, password} = inputs;

    const onChange = (event : any) =>{
        const {value, name} = event.target;
        setInputs({
            ...inputs, 
            [name] : value
        });
    };

    const name = 'taemin';
    const loggedIn = true;
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const theUser = {name, email, password, loggedIn}
    // const postUser = useSelector(selectUser);
    const onClick = ()=>{
        if(email === 'swpp@snu.ac.kr' && password === 'iluvswpp'){
            dispatch(logIn());
            dispatch(addUser(theUser));
            navigate('/articles')
        }else {
            alert("Email or password is wrong");
        }
    };

    
    return(
        <div>
            <input name = "email" id= "email-input" onChange = {onChange} value = {email}/>
            <input name = "password" id = "pw-input" onChange = {onChange} value = {password}/>
            <button id = "login-button" onClick = {onClick}>log-in</button>
            <br/> 
            {email} {password} 
        </div>
    )
}

export default Login;