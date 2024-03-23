import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from './components/Login'
import SignUp from "./components/SignUp";
import { useState } from "react";
function App() {
  const[alert,setAlert]=useState(null)
  const showAlert=(message,type)=>{
setAlert({
  msg:message,
  type:type
})
setTimeout(() => {
  setAlert(null)
}, 1500);
  }
  return (
    <>
    <NoteState>

      {/* <h1>This is my iNotebook</h1>
      <Home></Home> */}
      
      <Router>
      <Navbar/>
      <Alert alert={alert} ></Alert>
      <div className="container">

      
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert} />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login showAlert={showAlert} />} />
        <Route exact path="/signUp" element={<SignUp showAlert={showAlert} />} />

      </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
