import { createSlice } from '@reduxjs/toolkit'

type State = {
  toolbarPosition: 'top' | 'left' | 'right' | 'bottom'
  selectedFolderPath: string
}
const initialState = {
  toolbarPosition: 'left',
  selectedFolderPath: '',
}

const stateSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    toggleToolbarPosition: (state, action) => {
      state.toolbarPosition = action.payload
    },
    setSelectedFolderPath: (state, action) => {
      state.selectedFolderPath = action.payload
    },
  },
})
export const getToolbarPosition = (state: any) => state.states.toolbarPosition
export const getSelectedFolderPath = (state: any) =>
  state.states.selectedFolderPath

export const { setSelectedFolderPath, toggleToolbarPosition } =
  stateSlice.actions

export default stateSlice.reducer
