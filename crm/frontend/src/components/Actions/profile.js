import axios from 'axios';
import * as actiontypes from  "./types";
import {setError} from "./error";

export const getProfile = () => dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
      headers:{
        'Authorization': 'token ' +token
      }
  }
  console.log(config)
  axios
  .get('/access/employee', config)
  .then(resp=>{
      dispatch({
        type:actiontypes.GET_PROFILE,
        payload: resp.data
      })
  })
  .catch(err =>{
    dispatch({
      type:actiontypes.AUTH_CANCEL
    })
})
}

export const createProfile = ({pic:pic, ...data}) => async dispatch =>{
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
  .post('employee/', formData, config)
  .then(resp =>{
    dispatch(
      setError(" Profile Created Successfully",'noti-green')
    )
    dispatch(getProfile())
  })
  .catch(err =>{
    console.log(err)
    dispatch(
      setError(" Profile not created",'noti-red')
    )
  })

}
