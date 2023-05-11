import { createSlice } from '@reduxjs/toolkit'

export const UserReducer = createSlice({
  name: 'location',
  initialState: {
   userInfo:{
        search: [],
        token: "",
        uid: "",
        keywords: [],
        location: {
            lat: 10,
            lng: 10,
            city: ""
        },
        photoURL: "",
        isPhoneVerified: true,
        notificationControls: {
            new: true,
            join: true,
            reminder: true
        },
        phone: "",
        groups: [],
        displayName: "",
        email: ""
   }
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = UserReducer.actions

export default UserReducer.reducer