import axios from 'axios';
import * as actiontypes from  "./types";
import {setError} from "./error";

export const register = (email, password, name) => async dispatch =>{

    const config = {
        headers:{
          'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password, name});
    axios.post('create/', body, config)
    .then(resp =>{
        dispatch(
          setError(" Created Successfully",'noti-green')
        )
    })
    .catch(err =>{
      !err.response.data?
      dispatch(
        setError("Incorrect format",'noti-red')
      ):dispatch(
        setError(Object.values(err.response.data)[0],'noti-red')
      )
    })

}


export const login = (email, password) => dispatch =>{

    const config = {
        headers:{
          'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password});

    axios.post('api/login', body, config)
    .then(resp =>{
      dispatch({
          type:actiontypes.LOGIN,
          payload:resp.data
      })
      dispatch(
        setError(" Logged-In Successfully",'noti-green')
      )
    })
    .catch(err =>{
      !err.response.data?
      dispatch(
        setError("Incorrect format",'noti-red')
      ):dispatch(
        setError(Object.values(err.response.data)[0],'noti-red')
      )
    })
}
