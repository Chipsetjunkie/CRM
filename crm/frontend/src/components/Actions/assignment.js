import React, { Component } from 'react';
import * as actiontypes from  "./types";
import axios from 'axios';
import {setError} from "./error";


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
    dispatch({
      type:actiontypes.ADD_ASSIGNMENT,
      payload:resp.data
    })
    dispatch(
      setError("Assignment added",'noti-green')
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
    console.log(resp.data)
    dispatch({
      type:actiontypes.GET_ASSIGNMENTS,
      payload:resp.data
    })
  })
}
