import * as actiontypes from  "../Actions/types";

const initialState = {
  time:[]
}


export const TimeReducer = (state= initialState, action) =>{
    const {type,payload} = action
    switch (type) {
      case actiontypes.GET_TIME:
          return {
            ...state,
            time: payload,

          }

      case actiontypes.DELETE_TIME:

        const new_time = state.time.filter(time => parseInt(time.id) !== parseInt(action.payload))
        return {
          ...state,
          time:new_time
        }

      default:
        return state
    }

}
