import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { BASE_URL } from '../../util'

function SigninForm() {
const [userData, setUserData] = useState()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPasswordError, setConfirmPasswordError ]= useState(null)
const navigate = useNavigate()
const handelInput = async(e)=>{
    e.preventDefault()
 try{
        const {data} = await axios.post(`${BASE_URL}/api/user/signin`,
        { email, password}
        )
        console.log(data)
        navigate('/')
    
    } catch(err){
        setConfirmPasswordError(err)
    }
}

  return (
    <div>
          <form>
             <div>
                <label>Email</label>
                <input type='email'name='email' id='email'  placeholder='your email' onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
             <div>
                <label>Password</label>
                <input type='password' id='password' name='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
             
            <button type='submit' onClick={(e)=>handelInput(e)}>Sign in</button>
            <p>Haven't Account</p> <Link to='/signup'>Sign up</Link>
        </form>
        {
          confirmPasswordError && <h1>Check your password</h1>
        }
    </div>
  )
}

export default SigninForm