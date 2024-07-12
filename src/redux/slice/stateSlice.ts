import { createSlice } from '@reduxjs/toolkit'

type State = {
  selectedFolderPath: string
}
const initialState = {
  selectedFolderPath: '',
}

const stateSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    setSelectedFolderPath: (state, action) => {
      state.selectedFolderPath = action.payload
    },
  },
})
export const getSelectedFolderPath = (state: any) =>
  state.states.selectedFolderPath

export const { setSelectedFolderPath } = stateSlice.actions

export default stateSlice.reducer
