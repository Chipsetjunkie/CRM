import axios from 'axios';
import {setError} from "./error";
import { getProfile } from "./profile";
import * as actiontypes from  "./types";

export const createClient = (data) => async dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
      headers:{
        'Authorization': 'token ' +token,
        'Content-Type': 'application/json'
      }
    }

  const body = JSON.stringify(data);

  axios
  .post('client/', body, config)
  .then(resp =>{
    dispatch(
      setError(" Client Created Successfully",'noti-green')
    )
    dispatch(getProfile())
  })
  .catch(err =>{
    console.log(err)
    dispatch(
      setError(" Client creation failed",'noti-red')
    )
  })

}


export const getClient = (data) => async dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
      headers:{
        'Authorization': 'token ' +token,
      }
    }


  axios
  .get('access/client/', config)
  .then(resp =>{
    dispatch({
         type:actiontypes.GET_CLIENT,
         payload: resp.data
     })
  })
  .catch(err =>{
    console.log(err)
  
  })

}
