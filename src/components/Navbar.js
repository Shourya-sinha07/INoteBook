import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Navbar = () => {
  let location=useLocation();
  let navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate("/login")
  }
  return (
    <div>
     <nav className="navbar fixed-top  navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">

          {/* here we use use location hook here we check if the location.pathname is equal to / then add active class to home or not then dont add active classs .if path name is /about then add the active classs to about component */}
          <Link className={`nav-link ${location.pathname==="/"?"active": ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active": ""}`} to="/about">About</Link>
        </li>

      </ul>
     {!localStorage.getItem('token')?<form className="d-flex">
        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button> */}
        <Link className='btn btn-primary mx-1' role='button' to={"/login"} >Login</Link>
        <Link className='btn btn-primary mx-1' role='button' to={"/signUp"} >Sign Up</Link>
      </form>: <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
    </div>
  </div>
</nav>


    </div> 
  )
}

export default Navbar
