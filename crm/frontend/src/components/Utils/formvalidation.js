export const inputvalidated = state =>{
  for(var i of Object.values(state)){
    if(i.length === 0){
      return false
    }
  }
  return true
}
