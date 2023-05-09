import { createSlice } from '@reduxjs/toolkit'

export const LocationReducer = createSlice({
  name: 'location',
  initialState: {
    location:{
      description: ` , `,
      structured_formatting: {
          main_text: "",
          secondary_text: ``,
      },
  },
    positionPoints : {
      lat:10,
      lng: 10,
    },
    loaded: true,
    placeID: "",
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload
    },
    setplaceID: (state, action) => {
      state.placeID = action.payload
    },
    setPositionPoints: (state,action) => {
      state.positionPoints = action.payload;
    },
    setLoaded: (state,action) => {
      state.loaded = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLocation, setPositionPoints,setLoaded, setplaceID } = LocationReducer.actions

export default LocationReducer.reducer