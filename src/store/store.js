import { configureStore } from '@reduxjs/toolkit'
import reposReducer from "./reducers/reposSlice";

const store = configureStore({
  reducer: {
    repos: reposReducer
  },
})

export default store;
