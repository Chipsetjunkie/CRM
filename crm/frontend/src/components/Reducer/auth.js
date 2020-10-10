import * as actiontypes from  "../Actions/types";

const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:true,
    loading:true,
}


export const AuthReducer = (state= initialState, action) =>{

    const {type,payload} = action
    switch (type) {
      case actiontypes.LOGIN:
        console.log(type,payload)
        localStorage.setItem('token',payload.token);
        return {
          ...state,
          isAuthenticated:true,
          loading:false
        }

      case actiontypes.LOGOUT:
          localStorage.setItem('token',null);
          return {
            ...state,
            isAuthenticated:false
          }

      case actiontypes.AUTH_CANCEL:
          console.log("enteref cancel")
          return {
            ...state,
            isAuthenticated:false
          }

      default:
        return state
    }

}
