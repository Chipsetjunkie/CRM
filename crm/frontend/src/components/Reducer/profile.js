import * as actiontypes from  "../Actions/types";

const initialState = {
  profile:null,
  loading:true,
}


export const EmployeeReducer = (state= initialState, action) =>{
    const {type,payload} = action
    switch (type) {
      case actiontypes.GET_PROFILE:
          return {
            ...state,
            profile: payload,
            loading:false
          }

      default:
        return state
    }

}
