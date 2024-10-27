import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

// import authReducer from '../store/auth-slice'

const store = configureStore({
    // reducer: {auth: authReducer},
    reducer: {[apiSlice.reducerPath]: apiSlice.reducer},
    middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(apiSlice.middleware),
    devTools: true // to be able to use the dev tool
  });
  
export default store;
  