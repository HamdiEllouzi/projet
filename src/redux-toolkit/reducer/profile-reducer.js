import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile:{
    uid:'',
    email:'',
    displayName:'',
    photoURL:'',
    emailVerified:false ,
    phoneNumber:'',
  }
  
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile : (state,payload) =>{
        state.profile = payload.payload
    },
    editProfile :  (state,payload) =>{
        state.profile.photoURL = payload.payload.photoURL || state.profile.photoURL
    }
  },
})

// Action creators are generated for each case reducer function
export const { addProfile } = profileSlice.actions

export default profileSlice.reducer