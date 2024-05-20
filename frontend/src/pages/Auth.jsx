import { useState } from "react"
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  return (
    <section className="w-full flex items-start justify-between h-screen p-28">
      <Login />
      <Register />
    </section>
  )
}

export default Auth

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const  [_, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
        username,
        password
      })
      console.log(res.data)
      setCookies("access_token", res.data.token, {httpOnly: true})
      window.localStorage.setItem("userId", res.data.userId)
      navigate('/')
      alert("login successfully")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Form 
      username={username} 
      setUsername={setUsername} 
      password={password} 
      setPassword={setPassword} 
      label="Login"
      onSubmit={onSubmit}
      />
  )
}



const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
       await axios.post("http://localhost:3000/api/v1/auth/register", {
        username,
        email,
        password
      })
      alert("registrations successfully")
    } catch (error) {
      console.log(error.message)
    }
    
  }


  return (
    <Form 
      username={username} 
      email={email} 
      setEmail={setEmail} 
      setUsername={setUsername} 
      password={password} 
      setPassword={setPassword} 
      label="Register" 
      onSubmit={onSubmit}
      />
  )
}

const Form = ({ username, setUsername, email, setEmail, password, setPassword, onSubmit, label }) => {

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <h2 className="text-2xl">{label}</h2>
        <div className="flex flex-col gap-3">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            className="border border-black w-full max-w-[400px] p-2" 
          />
        </div>

        {email !== undefined && setEmail !== undefined && (
          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email:</label>
            <input 
              type="email"
              value={email} 
              id="email" 
              onChange={(e) => setEmail(e.target.value)} 
              className="border border-black w-full max-w-[400px] p-2"  
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password"
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}  
            className="border border-black w-full max-w-[400px] p-2" 
          />
        </div>

        <button 
          className="flex items-start justify-center border max-w-[100px] p-2 bg-black text-white" 
          type="submit">
            {label}
        </button>
      </form>
    </div>
  )
}