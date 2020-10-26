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

      default:
        return state
    }

}
