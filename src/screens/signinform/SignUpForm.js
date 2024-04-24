import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../util'
import {useNavigate} from 'react-router-dom'

function SignupForm() {
const [fullName, setFullName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [confirmPasswordError, setConfirmPasswordError ]= useState(null)

const navigate = useNavigate()

const handelInput = async(e)=>{
    e.preventDefault()
    // console.log(
    //     fullName,
    //     email,
    //     password,
    //     confirmPassword
    // )
    try{

    if(password === confirmPassword){
        const {data} = await axios.post(`${BASE_URL}/api/user/signup`,{
            fullName, email, password
        })
        navigate('/')
    }
    } catch(err){
        setConfirmPasswordError(err)
    }
    
}


  return (
    <div>
        <form onSubmit={handelInput}>
            <div>
                <label>Full Name</label>
                <input type='text' name='fullName' id='fullName' placeholder='your full name' onChange={(e)=>setFullName(e.target.value)} required />
            </div>
             <div>
                <label>Email</label>
                <input type='email'name='email' id='email'  placeholder='your email' onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
             <div>
                <label>Password</label>
                <input type='password' id='password' name='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
              <div>
                <label>Confirm Password</label>
                <input type='password' name='confirmPassword' id='confirmPassword' placeholder='confirm password' onChange={(e)=>setConfirmPassword(e.target.value)} required/>
            </div>
            <button type='submit' onClick={(e)=>handelInput(e)}>Sign up</button>
        </form>
        {confirmPasswordError && <h1>check your password</h1>}
    </div>
  )
}

export default SignupForm