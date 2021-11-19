import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile:{}
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile : (state,payload) =>{
        state.profile = payload.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addProfile } = profileSlice.actions

export default profileSlice.reducer