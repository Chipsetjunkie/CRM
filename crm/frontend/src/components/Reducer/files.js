import * as actiontypes from  "../Actions/types";

const initialState = {
  files:[],
  files_emp:[]
}

const clean_data = (id,data) =>{
  var final = []
  id.sort((a, b)=> b-a)
  for(var i of id){
      const d = data.filter(item => item.id ===i)
      final.push(d[0])
  }

  return final
}

export const FileReducer = (state= initialState, action) =>{
    switch (action.type) {
      case actiontypes.GET_FILES:
        const payload = clean_data(action.payload.id, action.payload.data)
        return{
          ...state,
          files:payload
        }

      case actiontypes.ADD_FILE:
        var files = state.files
        files.unshift(action.payload)
        return{
          ...state,
          files:files
        }



      case actiontypes.DELETE_FILE:
        const files_up = state.files.filter(file => file.id !== action.payload)
        return{
          ...state,
          files:files_up
        }

      case actiontypes.DELETE_FILE_EMP:
          const files_upe = state.files_emp.filter(file => file.id !== action.payload)
          return{
            ...state,
            files_emp:files_upe
          }



      case actiontypes.GET_FILES_EMP:
          const payload_emp = clean_data(action.payload.id, action.payload.data)
          return{
            ...state,
            files_emp:payload_emp
          }

      case actiontypes.ADD_FILE_EMP:
          var filesem = state.files_emp
          filesem.unshift(action.payload)
          return{
            ...state,
            files_emp:[filesem]
          }


      default:
        return state
    }

}
