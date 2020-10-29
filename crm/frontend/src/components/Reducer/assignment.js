import * as actiontypes from  "../Actions/types";

const initialState = {
    assignments:[]
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

    case actiontypes.DELETE_ASSIGNMENT:
      var assgn = state.assignments.filter(ass=> parseInt(ass.id) !== parseInt(action.payload))
      return{
        assignments:assgn
      }

    default:
      return state
  }
}
