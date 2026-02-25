import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSide: (state) => {
      state.isOpen = true;
    },
    closeSide: (state) => {
      state.isOpen = false;
    },
    toggleSide: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openSide, closeSide, toggleSide } = sidebarSlice.actions;
export default sidebarSlice.reducer;