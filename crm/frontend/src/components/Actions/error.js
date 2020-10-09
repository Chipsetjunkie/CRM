import * as actiontypes from './types';
const uuid = require('uuid');

export const setError = (message,errortype,timeout=5000) => dispatch =>{
      const id = uuid.v4();
      dispatch({
        type:actiontypes.ADD_ERROR,
        payload:{
            message,
            errortype,
            id
        }
      })
      setTimeout(()=>
        dispatch({
          type:actiontypes.REMOVE_ERROR,
          payload:id
        }), timeout)
}
