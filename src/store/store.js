import { configureStore } from '@reduxjs/toolkit'
import  ExploreTagModel  from './ModelSlice'
import  LocationReducer  from './LocationSlice'
import  UserReducer  from './UserSlice'

export default configureStore({
  reducer: {
    ModelReducer:ExploreTagModel,
    LocationReducer,
    UserReducer,
  }
})