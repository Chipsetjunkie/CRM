import React, { Component } from 'react';
import * as actiontypes from  "./types";
import axios from 'axios';
import {setError} from "./error";
import {deleteTime, getTime} from "./time";


export const createAssignment = data => dispatch =>{

  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
          'Content-Type': 'application/json'
        }
    }

  const payload = JSON.stringify(data);
  axios
  .post('create/employee/assignment/',payload,config)
  .then(resp=>{
    dispatch(
      getAssignments()
    )
    dispatch(
      setError("Assignment added",'noti-green')
    )
    dispatch(
      getTime()
    )
  })
  .catch(err =>{
    dispatch(
      setError("Something went wrong",'noti-red')
    )
  })
}


export const getAssignments = () => dispatch =>{

  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token
        }
    }

  axios
  .get('employee/assignment/',config)
  .then(resp=>{
    dispatch({
      type:actiontypes.GET_ASSIGNMENTS,
      payload:resp.data
    })
  })
}



export const updateAssignment = (data,id) => dispatch => {
    const token = localStorage.getItem('token')

    const config = {
       headers:{
         'Authorization': 'token '+token,
         'Content-Type': 'application/json'
       }
    }

    const payload = JSON.stringify(data)
    axios
    .patch(`employee/assignment/${id}/`,payload, config)
    .then(resp =>{
      console.log(resp.data)
      dispatch(
        setError("Assignment completed",'noti-green')
      )
      dispatch(
        getAssignments()
      )
    })
    .catch(err =>{
      dispatch(
        setError("Couldn't Update Assignment",'noti-red')
      )
    })
}
