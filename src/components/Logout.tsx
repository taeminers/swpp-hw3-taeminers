import React from 'react'
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {logIn, logOut} from "../store/loginDetail";

const Logout = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const loggingout = ()=>{
    dispatch(logOut());
    navigate('/login');
  }
  return (
    <div>
      <button id = 'logout-button' onClick = {loggingout}>Logout</button>
    </div>
  )
}

export default Logout
