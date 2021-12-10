import './App.css';
import SignInSide from './component/login-componet';
import SignUp from './component/sign-up';
import { useState } from 'react';
import {auth } from './firebase-config';
import Home from './component/home';
import {onAuthStateChanged} from 'firebase/auth'
import { useRoutes } from "react-router-dom";
import { RequireAuth, NotAuth } from './service/private-route';
import { storeUpdate } from './service/service';

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  onAuthStateChanged( auth ,(currentUser)=>{
  setUser(currentUser)
  currentUser&&storeUpdate()
   setLoading(false)
})
  let element = useRoutes([
    {  path:'/*' ,element: <RequireAuth user= {user}><Home user= {user}/></RequireAuth>},
    {  path:'/Sign-in', element:<NotAuth user={user}><SignInSide/></NotAuth>  },
    {  path:'/Sing-up', element: <NotAuth user={user}><SignUp /> </NotAuth>},
  ]);
  
  return loading? <div className="loader-container"><div className="loader"></div></div>: element
  }

export default App;
