import React, {useState} from 'react';
import '../index.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function RegisterRider() {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    phone:"",
    password:"",
    payment_method: "",
    default_pick: ""
  });

  const [message, setMessage] = useState("");
  const handleChange=  (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit=  async (e)=>{
    e.preventDefault(); 
   
    try{
     
        const response = await axios.post(
          "http://127.0.0.1:8000/api/register/rider", formData );
        console.log(response.data)
        setMessage("Registration successful!");
        if (response.status = 201){
          navigate('/login')
          return;
        }
    }
    catch (error){
        if (error.response){
          setMessage("Registration failed.");
        } else{
          setMessage("Something went wrong. Try again.");
        }
    }
    
  };

    return (
    < >
      <h2>Register</h2>
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
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <br /><br />

        <select name="payment_method" value={formData.payment_method} onChange={handleChange}>
            <option value="" >--Select--</option>
            <option value="upi">UPI</option>
            <option value="cash">Cash</option>
            <option value="netbanking">NetBanking</option>
            
          </select>

        <br/><br />

        <input
          type="text"
          name="default_pick"
          placeholder="Default Pick"
          value={formData.default_pick}
          onChange={handleChange}
          required
        />

        <br/><br/>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
      <br/>
      <button onClick={()=>navigate('/login')}>Already a User!</button>
    </>
  );
}

export default RegisterRider;