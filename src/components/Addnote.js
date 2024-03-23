import React, { useContext, useState } from "react";

import noteContext from "../context/notes/NoteContext"; //here we importing the notecontext
function Addnote(props) {
  const context = useContext(noteContext); //here we taking value from the notecontext and store in context
  const { addNote } = context; //destructuring from the context

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "",
    description: "",
    tag: ""})
    props.showAlert("Added Successfully","success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div style={{ marginTop: '110px' }}>
      <h2 className="my-3">Add Your Notes</h2>
      <div className="container my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={onChange}
              minLength={3}
              required
            />
            <div id="emailHelp" className="form-text">
              Title must be of 3 character
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
            <div id="emailHelp" className="form-text">
              Description must be of 5 character
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              minLength={3}
              required
            />
            <div id="emailHelp" className="form-text">
              Tag must be of 3 character
            </div>
          </div>

          <button
            type="submit"
            disabled={note.title.length<3 || note.description.length<5 }
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addnote;
