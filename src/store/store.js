import { configureStore } from '@reduxjs/toolkit'
import  ExploreTagModel  from './ModelSlice'
import  LocationReducer  from './LocationSlice'

export default configureStore({
  reducer: {
    ModelReducer:ExploreTagModel,
    LocationReducer,
  }
})