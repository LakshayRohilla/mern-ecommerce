import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartReducer from '../store/slices/cartSlice';
import authReducer from '../store/slices/authSlice';

// import authReducer from '../store/auth-slice'

const store = configureStore({
    // reducer: {auth: authReducer},
    reducer: {[apiSlice.reducerPath]: apiSlice.reducer, 
      cart: cartReducer,
      auth: authReducer
    },
    middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(apiSlice.middleware),
    devTools: true // to be able to use the dev tool
  });
  
export default store;
  