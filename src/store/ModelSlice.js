import { createSlice } from '@reduxjs/toolkit'

export const ExploreTagModel = createSlice({
  name: 'counter',
  initialState: {
    open: false,
    tags: [],
    appliedFilters: 0,
  },
  reducers: {
    setTagsFilter: (state, action) => {
      state.tags = action.payload
    },
    setAppliedFilter: (state, action) => {
      state.appliedFilters = action.payload
    },
    setOpenTagModel: (state, action) => {
      state.open = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setTagsFilter, setOpenTagModel, setAppliedFilter} = ExploreTagModel.actions

export default ExploreTagModel.reducer