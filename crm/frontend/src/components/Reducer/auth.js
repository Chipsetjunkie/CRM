import * as actiontypes from  "../Actions/types";

const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
}


export const AuthUser = (state= initialState, action) =>{
    switch (action.type) {
      case actiontypes.REGISTER_SUCCESS:
        localStorage.setItem('token',payload.token)
        return {
          ...initialState,
          isAuthenticated:True,
          loading:false
        }

        break;
      default:
        return state
    }

}
