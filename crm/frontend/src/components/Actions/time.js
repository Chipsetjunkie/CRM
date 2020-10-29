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
    .catch(err=>{

    })

}


export const deleteTime = (id,_id) => async dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
        }
    }

    axios
    .delete(`access/time/${id}/`,config)
    .then(resp =>{
      dispatch(
        setError("Deleted Assignment",'noti-green')
      )

      dispatch({
        type:actiontypes.DELETE_DUE,
        payload:id
      })


      dispatch({
        type:actiontypes.DELETE_TIME,
        payload:id
      })

      dispatch({
        type:actiontypes.DELETE_ASSIGNMENT,
        payload:_id
      })



    })
    .catch(err =>{
      dispatch(
        setError("Failed to delete", "noti-red")
      )
    })


}
