import axios from 'axios';
import * as actiontypes from  "./types";
import {setError} from "./error";


export const getFiles = id => async dispatch =>{

  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
        }
    }

    axios
    .get("client/files", config)
    .then(resp =>{
    dispatch({
        type:actiontypes.GET_FILES,
        payload:{"id":id,"data":resp.data}
      })
    })
    .catch(err =>{
      console.log(err)
      dispatch(
        setError(" File fetching failed",'noti-red')
      )
    })
}


export const addFile = order => dispatch =>{

    dispatch({
      type:actiontypes.ADD_FILE,
      payload: note
    })

}
