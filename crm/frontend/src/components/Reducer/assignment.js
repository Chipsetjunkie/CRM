import * as actiontypes from  "../Actions/types";

const initialState = {
    assignments:[],
    assignment:null
}

export const AssignmentReducer = (state= initialState, action) =>{

  switch (action.type) {
    case actiontypes.GET_ASSIGNMENTS:
      return{
          ...state,
          assignments:action.payload
      }

    case actiontypes.GET_ASSIGNMENT:
        return{
            ...state,
            assignment:action.payload
        }

    case actiontypes.ADD_ASSIGNMENT:
      var ass = state.assignments
      ass.unshift(action.payload)
      return{
        ...state,
        assignments:ass
      }

    default:
      return state
  }
}
