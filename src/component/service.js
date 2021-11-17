import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth'
import { auth} from '../firebase-config';
export const Login = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password).then((currentUser) => {
            resolve(currentUser)
        }).catch((error) => {
            reject(error)
        }) 
    })
}
export const logout = () => {
    signOut(auth)
}
export const register = (email, password,firstName,lastName) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password).then((currentUser) => {
            updateProfile(currentUser.user, {
                displayName: `${firstName} ${lastName}`,
              }).then((e)=> resolve(e))         
        }).catch((error) => {
            reject(error)
        })
    })

}
