import './App.css';
import SignInSide from './component/login-componet';
import SignUp from './component/sign-up';
import { useState } from 'react';
import {auth } from './firebase-config';
import Home from './component/home';
import {onAuthStateChanged} from 'firebase/auth'
import { useRoutes } from "react-router-dom";
import { Profile } from './component/profile';
import { useDispatch } from 'react-redux';
import { addProfile } from './redux-toolkit/reducer/profile-reducer';
import { RequireAuth, NotAuth } from './service/private-route';

function App() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  onAuthStateChanged( auth ,(currentUser)=>{
  setUser(currentUser)
  currentUser&&dispatch(addProfile({
    uid: currentUser.uid,
    email:currentUser.email,
    displayName:currentUser.displayName,
    photoURL:currentUser.photoURL || '',
    emailVerified:currentUser.emailVerified ,
    phoneNumber:currentUser.phoneNumber || '',
   }))
   setLoading(false)
})
  let element = useRoutes([
    {  path:'/' ,element: <RequireAuth user= {user}><Home user= {user}/></RequireAuth> ,children :[
        { path:'/Profile', element:<NotAuth user={user}><Profile/></NotAuth>}
    ]},
    {  path:'/Sign-in', element:<NotAuth user={user}><SignInSide/></NotAuth>  },
    {  path:'/Sing-up', element: <NotAuth user={user}><SignUp /> </NotAuth>},
  ]);
  
  


  return loading? <div className="loader-container"><div className="loader"></div></div>: element
  }

export default App;
