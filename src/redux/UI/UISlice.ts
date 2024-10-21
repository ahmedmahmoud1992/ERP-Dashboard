import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  isMobile: window.innerWidth <= 768,
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
      if (!action.payload) {
        state.isSidebarOpen = true;
      } else {
        state.isSidebarOpen = false;
      }
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setIsMobile, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
