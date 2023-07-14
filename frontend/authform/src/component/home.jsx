import React, { useEffect, useState } from 'react'
import "../App.css"
import { Profile } from './profile'

export const Home = () => {
  const [click,setClick] = useState(false);
  const [profile,setProfile] = useState([])
  const access_email = JSON.parse(localStorage.getItem("access-email"))
  const handleOpen = (e) => {
    e.preventDefault();
    setClick(true)
  }

  useEffect(()=>{
    const cookieString = document.cookie;
    
    fetch("http://localhost:3002/auth/profile",{
            headers:{
                "x-email":access_email,
                "cookies": cookieString
            }
        })
        .then( res => {return res.json()})
        .then(data => {
          setProfile(data.profileCheck);
        })
        .catch(err => console.log(err))
  },[])
  const handleLogout = () =>{
    document.cookie = "access-token" + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem("access-email")
    location.reload()
  }

  return (
    <div className='home_container'>
      <h1 style={{color:'skyblue'}}>Wellcome</h1>
      {click ? <Profile setClick={setClick}/> : null}
      {!profile.length ? <div>Loading...</div> :
      profile.length !== 0 ? profile.map( data => {
        return(
          <div className='profile_wrapper' key={data._id}>
            <span>username : {data.username}</span>
            <p style={{fontSize:12}}>{data.email}</p>
            <small>user bio : {data.bio}</small>
            <p style={{fontSize:12}}>age : {data.age}/{data.gender}</p>
          </div>
        )
      }):null
    }
      <button onClick={handleOpen}>{profile.length === 0 ? "Create" : "edit"} Profile</button>
      <button onClick={handleLogout}>Sign out</button>
    </div>
  )
}
