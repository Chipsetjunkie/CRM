import React from 'react'

const months = ["Jan","Feb","Mar", "Apr", "May", "Jun", "Jul",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec"
]

const days =[
"Sun",
"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat"
]



export const displayTimeLine = data =>{
  const date = new Date(data)
  const  d = new Date()

  if(d > date){
    return `${date.getDate()} ${ months[date.getMonth()]}, ${date.getFullYear()}`
  }

  if (date.getFullYear() > d.getFullYear()){
    return `${months[date.getMonth()]}, ${date.getFullYear()}`
  }
  if (date.getMonth() < d.getMonth()){
    return `${date.getDate()}, ${months[date.getMonth()]}`
  }

  if (date.getDate() - d.getDate()>1 ){
    return` ${date.getDate()} ${days[date.getDay()]}`
  }

  else{
    return `${date.getHours()}: ${date.getMinutes()}`
  }

}
