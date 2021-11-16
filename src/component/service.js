import {createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword} from 'firebase/auth'
import {auth } from '../firebase-config';

export const Login = (email , password)=>{ 
    return new Promise((resolve , reject ) =>{
        signInWithEmailAndPassword(auth,email, password).then((currentUser)=>{
            resolve()
          }).catch((error)=>{
            reject(error)
        })
    })
}

export const logout = ()=>{
    signOut(auth)
}
export const register = (email , password)=>{ 
    return new Promise((resolve , reject ) =>{
        createUserWithEmailAndPassword(auth,email, password).then((currentUser)=>{
            resolve()
          }).catch((error)=>{
            reject(error)
        })
    })

}
