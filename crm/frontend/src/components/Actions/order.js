import axios from 'axios';
import * as actiontypes from  "./types";
import {setError} from "./error";


export const getOrders = id => async dispatch =>{

  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
        }
    }

    axios
    .get("client/orders", config)
    .then(resp =>{
    dispatch({
        type:actiontypes.GET_ORDERS,
        payload:{"id":id,"data":resp.data}
      })
    })
    .catch(err =>{
      console.log(err)
      dispatch(
        setError(" Order fetching failed",'noti-red')
      )
    })
}



export const updateOrder = (data,id) => dispatch =>{

  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
          'Content-Type': 'application/json'
        }
    }

  const payload = JSON.stringify(data)

  axios
  .patch(`client/orders/${id}/`, payload, config)
  .then(resp=>{
    dispatch(
      setError("Order updated", "noti-green")
    )
    dispatch({
      type:actiontypes.UPDATE_ORDER,
      payload:resp.data
    })
  })
  .catch(err=>{
    dispatch(
      setError("Order updation failed", "noti-red")
    )
  })

}
