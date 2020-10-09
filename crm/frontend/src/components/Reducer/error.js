import * as actiontypes from  "../Actions/types";

const initialState = [
]


export const ErrorReducer = (state= initialState, action) =>{
    switch (action.type) {
      case actiontypes.ADD_ERROR:
        return[
          ...state,
          action.payload
        ]

     case actiontypes.REMOVE_ERROR:
          return state.filter(error => error.id != action.payload)

      default:
        return state
    }

}
