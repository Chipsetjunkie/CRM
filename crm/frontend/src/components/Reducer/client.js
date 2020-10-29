import * as actiontypes from  "../Actions/types";

const initialState = {
    clients:[],
    client:null
}

export const ClientReducer = (state= initialState, action) =>{

  switch (action.type) {
    case actiontypes.GET_CLIENTS:
      return{
          ...state,
          clients:action.payload
      }

    case actiontypes.GET_CLIENT:
        return{
            ...state,
            client:action.payload
        }


    case actiontypes.DELETE_DUE:
        var clients = state.clients.filter(cliet => cliet.id !== state.client.id)
        var client_date = state.client.due_date.filter(d => parseInt(d)!== parseInt(action.payload))
        var c = state.client
        c.due_date = client_date
        clients.push(c)
        return{
              clients:clients,
              client:c
            }


    default:
      return state
  }
}
