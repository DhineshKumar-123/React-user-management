import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";


const store = configureStore({
    reducer: {
        profile : profileReducer  //regisering the reducer 
    }
})

export default store; 