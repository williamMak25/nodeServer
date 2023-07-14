import React, { useEffect, useState } from 'react'
import "../App.css"
import { NavLink, useNavigate } from 'react-router-dom';

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const access_email = JSON.parse(localStorage.getItem("access-email"))
  console.log(access_email)
    useEffect(()=>{
      if(email === "" || password === ""){
        setOpen(true)
      }else{
        setOpen(false)
      }
    },[email,password,open])

  const handleSubmit =  (e) =>{
    e.preventDefault()
    fetch("http://localhost:3002/auth/login",{
      method:"POST",
      headers:{"Content-Type":"Application/json"},
      body:JSON.stringify({
        email,
        password
      }),
      credentials:"include"
    })
    .then( res =>{
      return res.json()
    })
    .then( data => {
      if(data){
      localStorage.setItem("access-email",JSON.stringify(data.access_email))
      navigate("/")
      location.reload()
      }
    })
    .catch(err => console.log(err))

  }
  
  return (
    <div className='form_container'>
      
      <form className='form' >
        <h2>Log in account</h2>
          <label for="email">Email</label>
          <input type='email' id='email' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
  
          <label for="password">Password</label>
          <input type='password' required id='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
  
        <button onClick={handleSubmit} disabled={open} style={ open ? {opacity:0.6,cursor:"auto"} : {opacity:1}}>Log in</button>

       <p>You don't have accout ?</p>
       <NavLink to="/signup"> Create account </NavLink>
      </form>
    </div>
  )
}