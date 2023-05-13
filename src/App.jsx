
import React, { useEffect, useState } from 'react'
import { FaCalendarDay, FaEnvelopeOpen, FaMapMarker, FaPhone, FaUser, FaUserLock } from "react-icons/fa"
import "./index.css"
const url = "https://randomuser.me/api"
function App() {
  const [person, setPerson] = useState(null)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("Name")
  const [value, setValue] = useState("random user")
const getData = async ()=>{
  setLoading(true)
  const request = await fetch(url)
  const data  = await request.json()
  const person = data.results[0]

  const {last, firts} = person.name
  const {email, phone} = person
  const {age} = person.dob
  const {street:{name, number}} = person.location
  const {password} = person.login
  const {large: image} = person.picture

  const newPerson = {
    name: `${last}, ${firts}`,
    email,
    age,
    phone,
    street: `${name}, ${number}`,
    password,
    image
  }
setPerson(newPerson)
setValue(newPerson.name)
setTitle("Name")
setLoading(false)
}
useEffect(()=>{
  getData()
}, [])

function handleValue(e) {
if (e.target.classList.contains("icon")) {
  const newValue = e.target.dataset.label
  setTitle(newValue)
  setValue(person[newValue])
}
}

  return (
   <>
   <div className="block bcg-black"></div>
   <div className="block">
    <div className="container">
      <img src={person && person.image} alt="" />
      <p className="user-title">
        My {title} is
      </p>
      <p className="user-value">
        {value}
      </p>
     <div className="values-list">
     <button className="icon" data-label="name" onMouseOver={handleValue}>
       <FaUser/>
      </button>
      <button className="icon" data-label="email" onMouseOver={handleValue}>
       <FaEnvelopeOpen/>
      </button>
      <button className="icon" data-label="age" onMouseOver={handleValue}>
       <FaCalendarDay/>
      </button>
      <button className="icon" data-label="street" onMouseOver={handleValue}>
       <FaMapMarker/>
      </button>
      <button className="icon" data-label="phone" onMouseOver={handleValue}>
   <FaPhone/>
      </button>

      <button className="icon" data-label="password" onMouseOver={handleValue}>
       <FaUserLock/>
      </button>
   
   
   
      
      
      
     </div>
     <button className="btn" type='button' onClick={getData}>
{loading ? "Loading..." : "Random user"}
     </button>
    </div>
   </div>
   </>

  )
}

export default App