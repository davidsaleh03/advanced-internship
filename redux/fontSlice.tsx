import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FontState {
  value: number
}

const initialState: FontState = {
  value: 18, 
}

export const fontSlice = createSlice({
  name: 'font',
  initialState,
  reducers: {
    increaseFont: (state) => {
      state.value += 1
    },
    decreaseFont: (state) => {
      state.value -= 1
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

// Export actions
export const { increaseFont, decreaseFont, setFontSize } = fontSlice.actions

export default fontSlice.reducer