import * as actiontypes from  "../Actions/types";

const initialState = {
  orders:[],
  order:null
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


const update_order = (orders,data) =>{
  console.log('entered upadte')
    for(var i of orders){
        if(i.id === data.id){
          i['completed'] = data.completed
        }
    }
    return orders

}

export const OrderReducer = (state= initialState, action) =>{
    switch (action.type) {
      case actiontypes.GET_ORDERS:
        const payload = clean_data(action.payload.id, action.payload.data)
        return{
          ...state,
          orders:payload
        }

      case actiontypes.ADD_ORDER:
        var orders = state.orders
        orders.unshift(action.payload)
        return{
          ...state,
          orders:orders
        }

      case actiontypes.GET_ORDER:
        return{
          ...this.state,
          order:action.payload
        }

     case actiontypes.UPDATE_ORDER:
          const new_payload = update_order(state.orders,action.payload)
          return{
            ...state,
            orders:new_payload
          }

      case actiontypes.DELETE_ORDER:
        notes = notes.filter(note => note.id !== payload.id)
        return{
          ...state,
          orders:notes,
          order: null
        }

      default:
        return state
    }

}
