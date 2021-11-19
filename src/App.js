import './App.css';
import SignInSide from './component/login-componet';
import SignUp from './component/sign-up';
import { useState,useEffect } from 'react';
import {auth } from './firebase-config';
import Home from './component/home';
import {onAuthStateChanged,getAuth} from 'firebase/auth'
import { useRoutes ,useLocation,Navigate } from "react-router-dom";
import { Profile } from './component/profile';
import { useDispatch } from 'react-redux';
import { addProfile } from './redux-toolkit/reducer/profile-reducer';
import { StoreUpdate } from './component/service';

function App() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
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
})

  let location = useLocation();

 function updateStore(){
  const userInfo =  getAuth().currentUser
  console.log(userInfo);

}

  let element = useRoutes([
    {  path:'/' ,element: <RequireAuth user= {user}><Home user= {user}/></RequireAuth> ,children :[
        { path:'/Profile', element:<NotAuth user={user}><Profile/></NotAuth>}
    ]},
    {  path:'/Sign-in', element:<NotAuth user={user}><SignInSide/></NotAuth>  },
    {  path:'/Sing-up', element: <NotAuth user={user}><SignUp /> </NotAuth>},
  ]);
  
  function RequireAuth({ children }) {
    if (!user) {
      return <Navigate to="/Sign-in" state={{ from: location }} />;
    }
    return children;
  }
  function NotAuth({ children }) {
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  }


  return element
  }

export default App;
