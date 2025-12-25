import React , {useState}from "react";
import '../index.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function LoginUser(){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [message, setMessage] = useState("")
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://127.0.0.1:8000/api/login", formData)

            const {user,access_token, refresh_token, message, error} = response.data

            // store in localstorage
            if (user){
                localStorage.setItem(`${user.username}_accesstoken`, access_token)
                localStorage.setItem(`${user.username}_refreshtoken`, refresh_token)
                localStorage.setItem('current_user', `${user.username}`)
                localStorage.setItem('current_user_id', user.id)
            
            }
            setMessage(message ? message: error)
            console.log(message ? message: error);
            if(response.status == 200){
                navigate('/bookride')
                return
            }
            
            
        }
        catch(err){
            console.log("login failed!", err.response.data)
            setMessage(err.response?.data?.error || 'login failed')
        }
    }
    return (
        <>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </>
    )
}
export default LoginUser;