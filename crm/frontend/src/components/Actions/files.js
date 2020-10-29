import axios from 'axios';
import * as actiontypes from  "./types";
import { getProfile } from "./profile";
import {getClient} from "./client";
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


export const addFile = file => dispatch =>{

    dispatch({
      type:actiontypes.ADD_FILE,
      payload: file
    })

}


// Employee
export const getFilesEmp = id => async dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
        }
    }

    axios
    .get("employee/files", config)
    .then(resp =>{
    dispatch({
        type:actiontypes.GET_FILES_EMP,
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



export const addFileEmp = file => dispatch =>{

    dispatch({
      type:actiontypes.ADD_FILE_EMP,
      payload: file
    })

}


export const deleteFile = (id,call,id_) => dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
        }
    }

  axios
  .delete(`client/files/${id}/`,config)
  .then(resp=>{
    dispatch(
      setError(" Deleted file",'noti-green')
    )
    call?
    dispatch(
      getClient(id_)
    ):""
    dispatch({
        type:actiontypes.DELETE_FILE,
        payload:id
    })
  })
  .catch(err =>{
    dispatch(
      setError(" unable to delete file",'noti-red')
    )
  })

}


export const deleteFileemp = (id,call) => dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
        }
    }

  axios
  .delete(`employee/files/${id}/`,config)
  .then(resp=>{
    dispatch(
      setError(" Deleted file",'noti-green')
    )
    call?
    dispatch(
      getProfile()
    ):""
    dispatch({
        type:actiontypes.DELETE_FILE_EMP,
        payload:id
    })
  })
  .catch(err =>{
    dispatch(
      setError(" unable to delete file",'noti-red')
    )
  })

}
