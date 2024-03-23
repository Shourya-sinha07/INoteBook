import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
export default function SignUp(props) {
  const [credential,setCredentials]=useState({ name:"", email:"",password:"", cpassword:""})
  let navigate=useNavigate()

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    //destructuring from the  credentials
    const{name,email,password,cpassword} = credential;
    // Check if password and confirm password match
  if (password !== cpassword) {
    props.showAlert("Password and Confirm Password do not match", "danger");
    return;
  }
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({name ,email ,password})
    });
    const json = await response.json()
    console.log(json)
    if(json.success){
      //redirect
      localStorage.setItem('token',json.authtoken)
      navigate('/') 
      props.showAlert("Account Created Successfully","success")
      console.log("successs is true")
    } else{
      props.showAlert("Invalid Credentials","danger")
    }
  };
  const onChange=(e)=>{
setCredentials({...credential,[e.target.name]:e.target.value})
  }
  return (
    <div className='container mt-2' >
        <h2 style={{ marginTop: '110px' }}>Sign up To use iNoteBook</h2>
     <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" minLength={5} onChange={onChange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
