import React, { useContext, useEffect, useRef, useState } from "react";

import noteContext from "../context/notes/NoteContext"; //here we importing the notecontext
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
export default function Notes(props) {
  const context = useContext(noteContext); //here we taking value from the notecontext and store in context
  const { notes, getNotes, editNote } = context; //destructuring from the context
  let navigate = useNavigate();
  //Getting the notes
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  //initializint the note varialble use useState and initializing its initial value to blank
  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
    id: "",
  });

  //here we using use ref 1st use ref is used for louncing the modal and second use ref is use for if user fill the fields and then click on update then modal get close
  const ref = useRef(null);
  const refClose = useRef(null);

  //This is the update function which is pass to the nodeitem component as prop
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag); //Here we using editNote function which is wrritten in context API
    refClose.current.click();
    e.preventDefault();
    props.showAlert("Updated Successfully", "success");
    // addNote(note.etitle, note.edescription, note.etag);
  };

  //This function is used for capture wdited data entered by the user
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* <!-- Button trigger modal make its display none because modal is triggirred when user click on edit icon --> */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-etitle" id="exampleModalLabel">
                Modal etitle
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      New Title
                    </label>
                    <input
                      type="text"
                      value={note.etitle}
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      aria-describedby="emailHelp"
                      onChange={onChange}
                      minLength={3}
                      required
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your information with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      New Description
                    </label>
                    <input
                      type="text"
                      value={note.edescription}
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      New Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={note.etag}
                      id="etag"
                      name="etag"
                      onChange={onChange}
                      minLength={3}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2 className="my-3">Yours Notes</h2>

        {/* // if we don't have anything to display in else condition of ternary operatorr the we use "&&" */}
        {notes.length === 0 && <p>No notes to Display</p>}
        {notes.map((note) => {
          // here we ittretate on notes using map function
          // return note.etitle //here we return the note etitle
          return (
            <Noteitem
              note={note}
              key={note._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
            ></Noteitem>
          );
        })}
      </div>
    </>
  );
}
