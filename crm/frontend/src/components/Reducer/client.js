import * as actiontypes from  "../Actions/types";

const initialState = {
    clients:[]
}

export const ClientReducer = (state= initialState, action) =>{

  switch (action.type) {
    case actiontypes.GET_CLIENT:
      return{
          clients:action.payload
      }
    default:
      return state
  }
}
