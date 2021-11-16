import './App.css';
import SignInSide from './component/login-componet';
import SignUp from './component/sign-up';
import { useState } from 'react';
import {auth } from './firebase-config';
import Home from './component/home';
import {onAuthStateChanged} from 'firebase/auth'
function App() {
  const [singup, setSingup] = useState(true);
  const [user, setUser] = useState({});
  const switchPage = () =>{
    setSingup(!singup)
  }
  onAuthStateChanged( auth ,(currentUser)=>{
    setUser(currentUser)
  })
  if(user === null){
  return (singup)?<SignInSide singup= {switchPage}/>:<SignUp singup= {switchPage}/>
  }else return <Home/>
}

export default App;
