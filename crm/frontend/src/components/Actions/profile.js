import axios from 'axios';
import * as actiontypes from  "./types";
import {setError} from "./error";

export const getProfile = () => dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
      headers:{
        'Authorization': 'token ' +token
      }
  }
  console.log(config)
  axios
  .get('/access/employee', config)
  .then(resp=>{
      dispatch({
        type:actiontypes.GET_PROFILE,
        payload: resp.data
      })
  })
  .catch(err =>{
    dispatch({
      type:actiontypes.AUTH_CANCEL
    })
})
}
