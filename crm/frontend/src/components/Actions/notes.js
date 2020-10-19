import axios from 'axios';
import * as actiontypes from  "./types";
import {setError} from "./error";


export const getNotes = id => dispatch =>{

  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
        }
    }

    axios
    .get(`access/notes/`, config)
    .then(resp =>{
    dispatch({
        type:actiontypes.GET_NOTES,
        payload:{"id":id,"data":resp.data}
      })
    })
    .catch(err =>{
      console.log(err)
      dispatch(
        setError(" note fetching failed ",'noti-red')
      )
    })
}


export const addNote = note => dispatch =>{

    dispatch({
      type:actiontypes.ADD_NOTE,
      payload: note
    })

}
