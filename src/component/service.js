import {createUserWithEmailAndPassword,signOut} from 'firebase/auth'
import {auth } from '../firebase-config';

export const Login = ()=>{

}
export const logout = ()=>{
    signOut(auth)
}
export const register = (email , password)=>{ 
    return new Promise((resolve , reject ) =>{
        createUserWithEmailAndPassword(auth,email, password).then((currentUser)=>{
            const user = currentUser.user
            console.log(user)
            resolve()
          }).catch((error)=>{
            console.log(error.message)
            reject(error)
        })
    })

}
