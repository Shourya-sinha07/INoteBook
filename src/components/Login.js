import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
export default function Login(props) {
  const [credential,setCredentials]=useState({email:"",password:""})
  let navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({email:credential.email,password:credential.password})
    });
    const json = await response.json()
    console.log(json)
    if(json.success){
      //redirect
      localStorage.setItem('token',json.authtoken)
      navigate('/') 
      console.log("successs is true")
      props.showAlert("Logged in Successfully","success")
    }else{

      props.showAlert("Wrong Credentials","danger")
    }
  };
  const onChange=(e)=>{
setCredentials({...credential,[e.target.name]:e.target.value})
  }
  return (
    <div className="mt-3" >
      <h2 style={{ marginTop: '110px' }}>Login To continue iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={credential.email}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            value={credential.password}
            name="password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onSubmit={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
