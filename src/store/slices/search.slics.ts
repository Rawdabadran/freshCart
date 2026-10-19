import { createSlice, PayloadAction } from "@reduxjs/toolkit"

 type searchInput={
     searchInput:string
}
const initialState:searchInput={
        searchInput:" "

}
const searchSlice =createSlice({
    name:"searchSlice",
    initialState:initialState,
    reducers:{
        setSerchResult:function(appstate,action: PayloadAction<string>){
          appstate.searchInput=action.payload
        }
    }

})


export const SearchReducer = searchSlice.reducer;
export const SearchActions = searchSlice.actions;