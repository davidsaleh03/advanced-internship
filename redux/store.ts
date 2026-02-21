import { configureStore } from '@reduxjs/toolkit'
import { recommendedApi } from './reccomenedSlice'
import fontReducer from './fontSlice' // <-- import your font slice

export const store = configureStore({
  reducer: {
    font: fontReducer, // <-- add your font slice here
    [recommendedApi.reducerPath]: recommendedApi.reducer, // keep your API slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recommendedApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch