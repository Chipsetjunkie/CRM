import axios from 'axios';
import {setError} from "./error";
import { getProfile } from "./profile";
import {  addNote } from "./notes";
import { getOrders } from "./order";
import { addFile } from "./files";
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

export const resetClient = () =>async dispatch =>{
  dispatch({
       type:actiontypes.GET_CLIENT,
       payload: null
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
    if(data.pic ){
      const pic = data.pic
      delete data.pic
      if (typeof(pic) !=="string"){

        formData.append("pic",pic)
      }
    }

    for (var i of Object.entries(data)){
      formData.append(i[0],i[1])
  }

  axios
  .patch(`access/client/${id}/`, formData, config)
  .then(resp =>{
    dispatch(
      setError("Updated success",'noti-green')
    )
    dispatch(
      getClients()
    )

  })
  .catch(err =>{
    dispatch(
      setError("Update failed",'noti-red')
    )
  })

}


export const updateClientNotes = (data,id) => dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
          'Content-Type': 'application/json'
        }
    }

  data["tag"] = "c"+String(id)
  const body = JSON.stringify(data)

  axios
  .post(`create/client/note/`, data, config)
  .then(resp =>{
    dispatch(
       addNote(resp.data)
    )

  })
  .catch(err =>{
    dispatch(
      setError(" Unable to Add note",'noti-red')
    )
  })

}



export const updateClientFile = (data,id) => dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
          'Content-Type': 'multipart/form-data'
        }
    }

  data["tag"] = "c"+String(id)

  var formData = new FormData();
  for(var i of Object.entries(data)){
    formData.append(i[0], i[1])
  }


  axios
  .post(`create/client/file/`, formData, config)
  .then(resp =>{
    dispatch(
      setError(" file Added",'noti-green')
    )
    dispatch(
      addFile(resp.data)
    )

  })
  .catch(err =>{
    dispatch(
      setError(" Unable to Add note",'noti-red')
    )
  })

}


export const updateClientOrder = (data,id,orders) => dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
          'Content-Type': 'application/json'
        }
    }

  data["tag"] = "c"+String(id)
  const body = JSON.stringify(data)

  axios
  .post(`create/client/order/`, data, config)
  .then(resp =>{
    dispatch(
      setError(" Order Added",'noti-green')
    )
    orders.push(resp.data.id)
    dispatch(
       getOrders(orders)
    )

  })
  .catch(err =>{
    dispatch(
      setError(" Unable to Add Order",'noti-red')
    )
  })

}
