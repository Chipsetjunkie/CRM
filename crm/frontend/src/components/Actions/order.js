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


export const addOrder = order => dispatch =>{

    dispatch({
      type:actiontypes.ADD_ORDER,
      payload: order
    })

}
