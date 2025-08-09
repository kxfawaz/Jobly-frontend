import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const LoginForm = ({login}) => {   //call login from app.jsx
    const navigate = useNavigate()

    const initialState = {
        username: '',
        password: ''
    }
const [formData,setFormData] = useState(initialState)

const handleChange = e => {
    setFormData(d=>({
        ...d,
        [e.target.name]: e.target.value
    }))
}

const handleSubmit =  async (e) => {
    e.preventDefault();
     console.log("LoginForm submit fired", formData)
    await login(formData)
    setFormData(initialState)
    navigate("/")
}
  return (
      
   <form onSubmit={handleSubmit}>
      <div className='mb-3'>
      <label class="form-label" htmlFor='username'>Username</label>
      <input 
      class="form-control"
      id='username'
      name='username'
      type='text' 
      placeholder='username' 
      value={formData.username}
      onChange={handleChange}
      />
      </div>

      <div className='mb-3'>
      <label class="form-label" htmlFor='password'>Password</label>
      <input
       class="form-control"
       id='password'
       name='password'
       type='password'
       placeholder='password'
       value={formData.password}
       onChange={handleChange}
      />
      </div>
      <button type='submit' className='btn btn-primary'>Login</button>
      </form>
      
  
  )
}

export default LoginForm
