import * as actiontypes from  "../Actions/types";

const initialState = {
    clients:[],
    client:null
}

export const ClientReducer = (state= initialState, action) =>{

  switch (action.type) {
    case actiontypes.GET_CLIENTS:
      return{
          ...state,
          clients:action.payload
      }

    case actiontypes.GET_CLIENT:
        return{
            ...state,
            client:action.payload
        }


    default:
      return state
  }
}
