import { createSlice } from "@reduxjs/toolkit";

type User={
       name:string,
        email:string,
        role:string,
        id?:string
  
}


export type initialState ={

  isAuthenticated:boolean,
  userInfo:null|User}


const initialState:initialState={
    isAuthenticated:false,
    userInfo:null
}



const authSlice = createSlice({
    name:"auth",
   initialState,
    reducers:{
      setAuthenticated:function(state, action){
       state.isAuthenticated=true;
      },
      setUserInfo:function(state, action){
       console.log(action)
       state.userInfo=action.payload;
      },
      logOut:function(state)
      {
        state.isAuthenticated=false;
        state.userInfo=null;
      }
    }
})

export const authReducer=authSlice.reducer;
export const authActions =authSlice.actions;