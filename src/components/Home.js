import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext" //here we importing the notecontext
import Notes from "./Notes";
import Addnote from "./Addnote";
const Home = (props) => {
//  const context= useContext(noteContext) //here we taking value from the notecontext and store in context
//  const{notes , setNotes}=context; //destructuring from the context
const{showAlert}=props
  return (
    <div>

      <Addnote showAlert={props.showAlert}></Addnote>
      
      <Notes showAlert={showAlert} ></Notes>
    </div>
  );
};

export default Home;
