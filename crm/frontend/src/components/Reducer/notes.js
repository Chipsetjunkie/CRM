import * as actiontypes from  "../Actions/types";

const initialState = {
  notes:[],
  note:null,
  notesEmp:[],
  noteEmp:null
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

export const NotesReducer = (state= initialState, action) =>{
    switch (action.type) {
      case actiontypes.GET_NOTES:
        const payload = clean_data(action.payload.id, action.payload.data)
        return{
          ...state,
          notes:payload
        }

      case actiontypes.ADD_NOTE:
        console.log("entered reducer")
        var notes = state.notes
        notes.unshift(action.payload)
        return{
          ...state,
          notes:notes
        }

      case actiontypes.GET_NOTE:
        return{
          ...this.state,
          note:action.payload
        }

      case actiontypes.DELETE_NOTES:
        notes = notes.filter(note => note.id !== payload.id)
        return{
          ...state,
          notes:notes,
          note: null
        }

      case actiontypes.GET_NOTES_EMP:
          const payload_emp = clean_data(action.payload.id, action.payload.data)
          return{
            ...state,
            notesEmp:payload_emp
          }

        case actiontypes.ADD_NOTE_EMP:
          console.log("entered reducer")
          var notes = state.notesEmp
          notes.unshift(action.payload)
          return{
            ...state,
            notesEmp:notes
          }

      default:
        return state
    }

}
