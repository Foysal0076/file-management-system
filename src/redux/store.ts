import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '@/redux/slice/apiSlice'
import stateSlice from '@/redux/slice/stateSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    states: stateSlice,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
})
