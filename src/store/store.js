import { configureStore } from '@reduxjs/toolkit'
import  ExploreTagModel  from './ModelSlice'

export default configureStore({
  reducer: {
    ModelReducer:ExploreTagModel
  }
})