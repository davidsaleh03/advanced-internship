import { configureStore } from '@reduxjs/toolkit'
import { recommendedApi } from './reccomenedSlice'
import fontReducer from './fontSlice' 
import modalReducer from './modalSlice'
import sidebarReducer from './sidebarSlice'

export const store = configureStore({
  reducer: {
    font: fontReducer, 
    modal: modalReducer,
    side: sidebarReducer,
    [recommendedApi.reducerPath]: recommendedApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recommendedApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch