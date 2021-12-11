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
  },
})

export const { addProfile,editProfile } = profileSlice.actions

export default profileSlice.reducer