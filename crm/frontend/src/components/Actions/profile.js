import axios from 'axios';
import * as actiontypes from  "./types";
import {setError} from "./error";
import {addNoteEmp} from "./notes";
import {addFileEmp} from "./files";

export const getProfile = () => dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
      headers:{
        'Authorization': 'token ' +token
      }
  }
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



export const getAllProfiles = () => async dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
      headers:{
        'Authorization': 'token ' +token
      }
  }
  axios
  .get('/access/all', config)
  .then(resp=>{
      dispatch({
        type:actiontypes.GET_ALL_PROFILE,
        payload: resp.data
      })
  })
  .catch(err =>{
    dispatch(
      setError("Profile fetching failed",'noti-red')
    )
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



export const updateProfile = (data,id) => dispatch =>{
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
  .patch(`/access/employee/${id}/`, formData,config)
  .then(resp=>{
    dispatch(
      setError(" Profile Updated Sucessfully! ",'noti-green')
    )
  })
  .catch(err =>{
    dispatch(
      setError(" Profile Update Failed! ",'noti-red')
    )
})
}


export const updateEmployeeNotes = (data,id) => dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
          'Content-Type': 'application/json'
        }
    }

  data["tag"] = "e"+String(id)
  const body = JSON.stringify(data)

  axios
  .post(`create/employee/notes/`, data, config)
  .then(resp =>{
    dispatch(
       addNoteEmp(resp.data)
    )

  })
  .catch(err =>{
    dispatch(
      setError(" Unable to Add note",'noti-red')
    )
  })

}



export const updateEmployeeFile = (data,id) => dispatch =>{
  const token = localStorage.getItem('token')

  const config = {
        headers:{
          'Authorization': 'token ' +token,
          'Content-Type': 'multipart/form-data'
        }
    }

  data["tag"] = "e"+String(id)

  var formData = new FormData();
  for(var i of Object.entries(data)){
    formData.append(i[0], i[1])
  }

  for(var i of formData.entries()){
    console.log(i)
  }

  axios
  .post(`create/employee/files/`, formData, config)
  .then(resp =>{
    dispatch(
      setError(" file Added",'noti-green')
    )
    dispatch(
      addFileEmp(resp.data)
    )

  })
  .catch(err =>{
    dispatch(
      setError(" Unable to Add file",'noti-red')
    )
  })

}
