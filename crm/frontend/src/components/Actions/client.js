import axios from 'axios';
import {setError} from "./error";
import { getProfile } from "./profile";
import * as actiontypes from  "./types";

export const createClient = ({pic:pic, ...data}) => async dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
          'Content-Type': 'multipart/form-data'
        }
    }

    var formData = new FormData();
    formData.append("pic",pic[0])
    for (var i of Object.entries(data)){
      formData.append(i[0],i[1])
  }

  axios
  .post('client/', formData, config)
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


export const getClients = () => async dispatch =>{
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
         type:actiontypes.GET_CLIENTS,
         payload: resp.data
     })
  })
  .catch(err =>{
    console.log(err)

  })

}


export const getClient = id => async dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
      headers:{
        'Authorization': 'token ' +token,
      }
    }


  axios
  .get(`access/client/${id}`, config)
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

export const updateClient = (data,id) => dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
          'Content-Type': 'multipart/form-data'
        }
    }


    var formData = new FormData();
    if(data.pic){
        formData.append("pic",data.pic)
    }

    for (var i of Object.entries(data)){
      formData.append(i[0],i[1])
  }

  axios
  .patch(`access/client/${id}/`, formData, config)
  .then(resp =>{
    dispatch(
      setError(" Client update success",'noti-green')
    )

  })
  .catch(err =>{
    console.log(err)
    dispatch(
      setError(" Client update failed",'noti-red')
    )
  })

}
