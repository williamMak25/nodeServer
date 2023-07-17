import React, { useEffect, useState } from 'react'
import "../App.css"

export const EditForm = ({profileData,edit}) => {
  
  
  const [editedData,setEditedData] = useState({
    username: profileData[0].username,
    gender: profileData[0].gender,
    age: profileData[0].age,
    email: profileData[0].email,
    bio:profileData[0].bio,
  })

const handlechange = (e) =>{
    const {name,value} = e.target;
    setEditedData( pre =>({
        ...pre,
        [name]:value
    }))
}
  
  const handleEdit = () => {
    fetch(`http://localhost:3002/auth/profile/${profileData[0]._id}`,{
      method:"PUT",
      headers:{"Content-Type":"Application/json"},
      body:JSON.stringify(
        editedData
      )
    }).then( res => {
      console.log(res.json())
      location.reload()
    })
    .catch( err => console.log(err))
  }
      console.log(editedData)
  return (
    <div>
        {profileData.length && profileData.map( data => {
        return(
          <div className='profile_wrapper' key={data._id}>
          
          <div className='edit_form'>
            <p>username : </p>
            <input type='text'defaultValue={data.username} value={editedData.username} name='username' onChange={handlechange}/>

            <p>email : </p>
            <input type='text' defaultValue={data.email} value={editedData.email} name='email' onChange={handlechange}/>

            <p>user bio : </p>
            <input type='text' defaultValue={data.bio} value={editedData.bio} name='bio' onChange={handlechange}/>

            <p>age : </p>
            <input type='text' defaultValue={data.age} value={editedData.age} name='age' onChange={handlechange}/>

            <p>gender : </p>
            <input type='text' defaultValue={data.gender} value={editedData.gender} name='gender' onChange={handlechange}/>
           </div>
            <button className='normal' onClick={handleEdit}>Comfirm</button>
            <button onClick={()=>edit(false)} className='cancal'>Discard</button>
          </div>
        )
      })}
    </div>
  )
}