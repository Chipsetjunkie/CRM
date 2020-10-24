export const inputvalidated = state =>{
  for(var i of Object.values(state)){
    if(i.length === 0){
      return false
    }
  }
  return true
}


export const file_is_valid = file =>{
  const allowable_formats = ['jpeg', 'jpg', 'png', 'pdf', 'mp3']
  return file.size < 5000001 && allowable_formats.includes(file.type.split('/')[1])
}
