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


  return `${date.getDate()} ${ months[date.getMonth()]}, ${date.getFullYear()}`


}
