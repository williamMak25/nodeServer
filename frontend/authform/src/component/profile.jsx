import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import "../App.css"

export const Profile = ({setClick}) => {
    const access_email = JSON.parse(localStorage.getItem("access-email"))
    const navigate = useNavigate()
    const [profileData,setProfileData] = useState({
        username: "",
        gender: "male",
        age: "",
        email: "",
        bio: "",
    })
    
    const handlechange = (e) =>{
        const {name,value} = e.target;
        setProfileData( pre =>({
            ...pre,
            [name]:value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch("http://localhost:3002/auth/profile",{
            method:"POST",
            headers:{
               "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                username: profileData.username,
                gender: profileData.gender,
                age: profileData.age,
                email: profileData.email,
                bio: profileData.bio,
            })
        }).then( res => navigate("/"))
        .catch(err => console.log(err))
    }
    console.log(profileData)
  return (
    <div className='profile_container'>

        <form className='profile_form'>

            <label>user-name : </label>
            <input type='text' name='username' onChange={handlechange}/>

            <label>gender : </label>
            <select name='gender'  onChange={handlechange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            
            <label>age : </label>
            <input type='number'  name='age' onChange={handlechange}/>

            <label>email: </label>
            <input type='text'  name='email' onChange={handlechange}/>

            <label>user-bio : </label>
            <input type='text'  name='bio' onChange={handlechange}/>
            
            <button onClick={handleSubmit}>Done</button>
            <button onClick={()=>setClick(false)}>Cancel</button>
        </form>
    </div>
  )
}
