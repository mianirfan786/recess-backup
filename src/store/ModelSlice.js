import { createSlice } from '@reduxjs/toolkit'

export const ExploreTagModel = createSlice({
  name: 'counter',
  initialState: {
    open: false,
    tags: [],
  },
  reducers: {
    setTagsFilter: (state, action) => {
      state.tags = action.payload
    },
    setOpenTagModel: (state, action) => {
      state.open = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setTagsFilter, setOpenTagModel, } = ExploreTagModel.actions

export default ExploreTagModel.reducer