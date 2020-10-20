import * as actiontypes from  "../Actions/types";

const initialState = {
  files:[],
  file:null,
  files_emp:[],
  file_emp:null
}

const clean_data = (id,data) =>{
  var final = []
  id.sort().reverse()
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
        console.log("entered reducer")
        var files = state.files
        files.unshift(action.payload)
        return{
          ...state,
          files:files
        }

      case actiontypes.GET_FILE:
        return{
          ...this.state,
          file:action.payload
        }

      case actiontypes.DELETE_FILE:
        notes = notes.filter(note => note.id !== payload.id)
        return{
          ...state,
          files:notes,
          file: null
        }

      case actiontypes.GET_FILES_EMP:
          const payload_emp = clean_data(action.payload.id, action.payload.data)
          return{
            ...state,
            files_emp:payload_emp
          }

      case actiontypes.ADD_FILE_EMP:
          console.log("entered reducer")
          var files = state.files_emp
          files.unshift(action.payload)
          return{
            ...state,
            files_emp:files
          }


      default:
        return state
    }

}
