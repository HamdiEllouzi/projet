import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { addProfile } from '../redux-toolkit/reducer/profile-reducer';
import { profileStore } from '../redux-toolkit/store/profile-store';
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  arrayUnion,
  updateDoc,
  increment,
  arrayRemove,
} from 'firebase/firestore';
import axios from 'axios';

const dbUrl = process.env.REACT_APP_DATA_BASE_URL;
const TokenData = JSON.parse(localStorage.getItem('Token'));
const currentUser = JSON.parse(localStorage.getItem('User'));
const axiosReq = axios.create({
  baseURL: dbUrl,
  headers: {
    authorization: `Bearer ${TokenData}`,
  },
});

export const Login = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((currentUser) => {
        resolve(currentUser);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const logout = () => {
  return new Promise((resolve, reject) => {
    localStorage.clear();
    resolve();
  });
};
export const register = (email, password, firstName, lastName) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((currentUser) => {
        updateProfile(currentUser.user, {
          displayName: `${firstName} ${lastName}`,
        }).then((e) => {
          const userRef = doc(db, 'users', currentUser.user.uid);
          const newUser = {
            uid: currentUser.user.uid,
            email: email,
            displayName: `${firstName} ${lastName}`,
            photoURL: '',
            phoneNumber: '',
          };
          setDoc(userRef, newUser).then((e) => {
            resolve(e);
          });
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const storeUpdate = () => {
  // const currentUser = auth.currentUser

  profileStore.dispatch(
    addProfile({
      uid: currentUser._id,
      email: currentUser.email,
      displayName: currentUser.userFirstName,
      photoURL: currentUser.userImage || '',
    }),
  );
};
export const upImgProfile = (imgUrl) => {
  /*const currentUser = auth.currentUser;
  const userRef = doc(db, 'users', currentUser.uid);*/
  return new Promise((resolve, reject) => {
    axiosReq
      .put('/api/update', {
        userId: currentUser._id,
        userImage: imgUrl,
      })
      .then()
      .catch((error) => console.log(error));
    /*  updateProfile(user, {
      photoURL: imgUrl,
    })
      .then((e) => {
        updateDoc(userRef, {
          photoURL: imgUrl,
        }).then((e) => resolve(e));
      })
      .catch((e) => reject(e));*/
  });
};
export const upProfile = (user, firstName, lastName, email, newPassword) => {
  /* const currentUser = auth.currentUser;
  const userRef = doc(db, 'users', currentUser.uid);*/
  return new Promise((resolve, reject) => {
    /*updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    })
      .then((a) => {
        updateDoc(userRef, {
          displayName: `${firstName} ${lastName}`,
        }).then((e) => {
          storeUpdate();
          resolve(e);
        });
      })
      .catch((e) => reject(e));
    newPassword &&
      updatePassword(user, newPassword)
        .then((e) => {
          resolve(e);
        })
        .catch((error) => {
          reject(error);
        });
    user.email !== email &&
      updateEmail(user, email)
        .then((e) => {
          updateDoc(userRef, {
            email: email,
          }).then((e) => {
            storeUpdate();
            resolve(e);
          });
        })
        .catch((e) => reject(e));*/
  });
};

export const setPost = (post, id) => {
  return new Promise((resolve, reject) => {
    const userRef = doc(db, 'posts', id);
    setDoc(userRef, post)
      .then((e) => {
        resolve(e);
      })
      .catch((e) => reject(e));
  });
};

export const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    const userRef = doc(db, 'posts', id);
    deleteDoc(userRef)
      .then((e) => {
        resolve(e);
      })
      .catch((e) => reject(e));
  });
};

export const setComment = (id, comment) => {
  return new Promise((resolve, reject) => {
    const userRef = doc(db, 'posts', id);
    updateDoc(userRef, {
      comment: arrayUnion(comment),
    })
      .then(() => {
        updateDoc(userRef, {
          commentsNumber: increment(1),
        }).then((e) => resolve(e));
      })
      .catch((e) => reject(e));
  });
};

export const setLikeDislike = (postId) => {
  return new Promise((resolve, reject) => {
    const userRef = doc(db, 'posts', postId);
    getDoc(userRef).then((data) => {
      const like = data.data().like.find((v) => v === auth.currentUser.uid);
      !like
        ? updateDoc(userRef, {
            like: arrayUnion(auth.currentUser.uid),
          })
            .then(() => {
              updateDoc(userRef, {
                likesNumber: increment(1),
              }).then((e) => resolve(e));
            })
            .catch((e) => reject(e))
        : updateDoc(userRef, {
            like: arrayRemove(auth.currentUser.uid),
          })
            .then(() => {
              updateDoc(userRef, {
                likesNumber: increment(-1),
              }).then((e) => resolve(e));
            })
            .catch((e) => reject(e));
    });
  });
};
