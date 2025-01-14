import React, { useContext } from 'react'

import noteContext from "../context/notes/NoteContext" //here we importing the notecontext
export default function Noteitem(props) {
  const context= useContext(noteContext) //here we taking value from the notecontext and store in context
 const{deleteNote}=context; //destructuring from the context
    const {note ,updateNote}=props;
  return (
    <div className='col-md-3'>
      
     
      <div className="card my-3">
    <span className="badge bg-primary">{note.tag}</span>
  <div className="card-body overflow-auto">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text"> {note.description}</p>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);  props.showAlert("Deleted Succcessfully","success")}}></i>
    <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note)}}></i>
  </div>
</div>

    </div>

  )
}

