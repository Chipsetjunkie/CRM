import axios from 'axios';
import * as actiontypes from  "./types";
import {setError} from "./error";


export const getTime = () => async dispatch =>{

  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
        }
    }

    axios
    .get("access/time/", config)
    .then(resp =>{
    dispatch({
        type:actiontypes.GET_TIME,
        payload:resp.data
      })
    })
    .catch(err =>{
      console.log(err)
      dispatch(
        setError(" fetching time failed",'noti-red')
      )
    })
}
