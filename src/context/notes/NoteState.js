import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all Note
  const getNotes = async () => {
    //Todo API call
    //API call
    let url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "applicaton/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  
  //ADD a Note

  const addNote = async (title, description, tag) => {
    try {
      let url = `${host}/api/notes/addnotes`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      console.log("Adding a new note");

      const newNote = await response.json(); // Get the newly added note from the response
      setNotes([...notes, newNote]); // Update state with the newly added note
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  //Delete a Note

  //API call
  const deleteNote = async (id) => {
    try {
      // Construct the URL for the API endpoint to delete the note
      let url = `${host}/api/notes/deletenotes/${id}`;

      // Send a DELETE request to the API endpoint
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        // If response is not ok, throw an error with the status text
        throw new Error(response.statusText);
      }

      // Parse the JSON response
      const json = await response.json();
      // console.log(json);

      // Log a message indicating that the note has been deleted
      // console.log("Deleted the note whose id is " + id);

      // Filter out the deleted note from the notes array
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });

      // Update the state with the filtered notes
      setNotes(newNotes);
    } catch (error) {
      // Alert the user with the error message
      alert("Internal server error: " + error.message);

      // Log any errors that occur during the deletion process
      console.error("Error deleting note:", error);
    }
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      //API call
      let url = `${host}/api/notes/updatenotes/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      console.log(json);
      //Logic to edit in clinent
      let newNotes = JSON.parse(JSON.stringify(notes)); //here covert the response into string and after that agan covert it into araay object (or copying the response)
      for (let index = 0; index < newNotes.length; index++) {
        //newnote is array object

        const element = newNotes[index]; //here we taking single , single object

        if (element._id === id) {
          //here check the condition that which object id match the id which is pass in api call

          //after getting the object which we want to update update its title , deccription and tag
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes); //setting the notes value
    } catch (error) {
      // Alert the user with the error message
      alert("Internal server error: " + error.message);

      // Log any errors that occur during the deletion process
      console.error("Error deleting note:", error);
    }
  };

  return (
    // //NoteContext.Provider it is like container where we put some data which can be used by other component
    // //value={{state:state, update:update}} here we put value in container (by packing values in an object)

    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
