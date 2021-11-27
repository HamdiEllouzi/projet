import {
    createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword,
    updateProfile, updateEmail, updatePassword
} from 'firebase/auth'
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
    const currentUser = auth.currentUser
    profileStore.dispatch(addProfile({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL || '',
        emailVerified: currentUser.emailVerified,
        phoneNumber: currentUser.phoneNumber || '',
    }))
}
export const upImgProfile = (user, imgUrl) => {
    return new Promise((resolve, reject) => {
        updateProfile(user, {
            photoURL: imgUrl,
        }).then(e => resolve(e)).catch(e => reject(e))
    })
}
export const upProfile = (user, firstName, lastName, email, newPassword) => {
    return new Promise((resolve, reject) => {
        updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
        }).then((a) => { storeUpdate() }).catch(e => reject(e))
        newPassword && updatePassword(user, newPassword).then((e) => {
            console.log('password updated');
            resolve(e)
        }).catch((error) => { reject(error) });
        (user.email !== email) && updateEmail(user, email).then((e) => {
            console.log('email updated');
            storeUpdate()
            resolve(e)
        }).catch(e => reject(e))
    })
}
