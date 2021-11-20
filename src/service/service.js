import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile, getAuth } from 'firebase/auth'
import { auth } from '../firebase-config';
import { addProfile } from '../redux-toolkit/reducer/profile-reducer';
import { profileStore } from '../redux-toolkit/store/profile-store';

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
export const register = (email, password, firstName, lastName) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password).then((currentUser) => {
            updateProfile(currentUser.user, {
                displayName: `${firstName} ${lastName}`,
            }).then((e) => resolve(e))
        }).catch((error) => {
            reject(error)
        })
    })
}
export const storeUpdate = () => {
    const currentUser = getAuth().currentUser
    profileStore.dispatch(addProfile({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL || '',
        emailVerified: currentUser.emailVerified,
        phoneNumber: currentUser.phoneNumber || '',
    }))
}
export const upProfile = (user, imgUrl) => {
    return new Promise((resolve, reject) => {
        updateProfile(user, {
            photoURL: imgUrl,
        }).then(e => resolve(e)).catch(e => reject(e))
    })
}
