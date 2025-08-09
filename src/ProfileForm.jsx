import React from 'react'
import {useState} from 'react'

const ProfileForm = ({currentUser}) => {

    if(!currentUser) return <p></p>

   const initalState = {
    username: currentUser.username || "",  // if currentUser hasnt loaded yet make sure the form has "" so it doesnt create an error
    password: "",
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || ""
   }
    const [formData,setFormData] = useState(initalState)

    const handleChange = e => {
    setFormData(d=>({
        ...d,
        [e.target.name]: e.target.value
    }))
}

const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData)
    setFormData(initialState)
    navigate("/")
}
  return (
    <>
    <form onSubmit={handleSubmit}>

        <div className="mb-3">
      <label className='form-label' htmlFor='username'>Username</label>
      <input 
      className='form-control'
      id='username'
      name='username'
      type='text' 
      placeholder='username' 
      value={formData.username}
      onChange={handleChange}
      />
      </div>

      <div className="mb-3"></div>
      <label className='form-label' htmlFor='password'>Password</label>
      <input
      className='form-control'
      id='password'
       name='password'
       type='password'
       placeholder='password'
       value={formData.password}
       onChange={handleChange}
      />
        <div class="mb-3">
        <label className='form-label' htmlFor='firstName'>First Name</label>
        <input
        className='form-control'
          id='firstName'
          name='firstName'
          type='text'
          placeholder='First Name'
          value={formData.firstName}
          onChange={handleChange}
        />
        </div>
        <div class="mb-3">
        <label className='form-label' htmlFor='lastName'>Last Name</label>
        <input
        className='form-control'
          id='lastName'
          name='lastName'
          type='text'
          placeholder='Last Name'
          value={formData.lastName}
          onChange={handleChange}/> 
          </div>



        <div className="mb-3">
        <label className='form-label' htmlFor='email'>Email</label>
        <input
        className='form-control'
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}/>
          </div>
      <button class="btn btn-primary" type='submit'>Save Changes</button>

      </form>
      </>
   
  )
}

export default ProfileForm
