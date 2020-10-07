import axios from 'axios';
import * as actiontypes from  "./types";

export const register = ({name, email, password}) => {

    const config = {
        headers:{
          'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password});

    try{
      const res = await axios.post('api/user', body, config)

      dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
      });
    }catch(err){
    dispatch({
      type:AUTH_ERROR
    })
