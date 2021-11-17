import './App.css';
import SignInSide from './component/login-componet';
import SignUp from './component/sign-up';
import { useState,useEffect } from 'react';
import {auth } from './firebase-config';
import Home from './component/home';
import {onAuthStateChanged} from 'firebase/auth'
import { useNavigate  ,Route, Routes,useRoutes ,useLocation } from "react-router-dom";

function App() {
  let location = useLocation();
  const [user, setUser] = useState({});
  const navigate = useNavigate ()
  onAuthStateChanged( auth ,(currentUser)=>{
    setUser(currentUser)
  })
  let element = useRoutes([
    {  path:'/', element: <Home user= {user}/> },
    {  path:'/Sign-in', element: <SignInSide/> },
    {  path:'/Sing-up', element: <SignUp /> },
  ]);
useEffect(() => {
  if(user === null){
    navigate('Sign-in') 
  }
}, [user,location.pathname]);
  return element
}
export default App;
