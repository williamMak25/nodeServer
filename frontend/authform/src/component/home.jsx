import React, { useEffect, useState } from 'react'
import "../App.css"
import { Profile } from './profile'
import { NavLink } from 'react-router-dom';
import { EditForm } from './editForm';

export const Home = () => {
  const [click,setClick] = useState(false);
  const [profile,setProfile] = useState([])
  const [edit,setEdit] = useState(false)
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

  const handleDelete = async() =>{
   await fetch(`http://localhost:3002/auth/profile/${profile[0]._id}`,{
      method:"DELETE"
    }).then( (res) => {
      document.cookie = "access-token" + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      localStorage.removeItem("access-email")
      location.reload()
    }).catch( err => console.log(err))
  }
  return (
    <div className='home_container'>
      <div className='header_container'>
        <h1>Wellcome</h1>
        <span>{profile ? profile[0].email : null}</span>
      </div>

      {click ? <Profile setClick={setClick}/> : null}
      {!profile.length ? <div>Loading...</div> :
      !edit ? profile.map( data => {
        return(
          <div className='profile_wrapper' key={data._id}>
            <div>
              <p>username : <span style={{color:"green",fontWeight:"bold"}}> {data.username} </span></p>
              
              <p>user bio : <span style={{color:"green",fontWeight:"bold"}}> {data.bio} </span></p>
              <p>age : <span style={{color:"green",fontWeight:"bold"}}> {data.age} </span></p>
            <p>gender :<span style={{color:"green",fontWeight:"bold"}}> {data.gender} </span></p>
            </div>
            <button onClick={handleDelete}>Delete Account</button>
          </div>
        )
      }):<EditForm edit={setEdit} profileData={profile}/>
    }
      <button onClick={()=>setEdit(true)} className='normal'>Edit</button>
      <button onClick={handleOpen} className='normal'>Create Profile</button>
      <button onClick={handleLogout} className='cancal'>Sign out</button>
    </div>
  )
}
