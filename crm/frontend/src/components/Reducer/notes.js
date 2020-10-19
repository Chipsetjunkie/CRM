import * as actiontypes from  "../Actions/types";

const initialState = {
  notes:[],
  note:null
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

      default:
        return state
    }

}
