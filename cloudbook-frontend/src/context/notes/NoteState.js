import noteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000";

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async () => {

      // API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwNzkyMzVlNjljMThlYjNmYWFlMzYxIn0sImlhdCI6MTY0NTAyNTkyN30.uMaBhhraPbjbFi66vqhg9IJlMNbqwBKltPZBRwPuJ54"
        }
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);

    }
     
  // Add a Note
  const addNote = async (title, description, tag) => {

    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwNzkyMzVlNjljMThlYjNmYWFlMzYxIn0sImlhdCI6MTY0NTAyNTkyN30.uMaBhhraPbjbFi66vqhg9IJlMNbqwBKltPZBRwPuJ54"
      },
      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json();
    console.log(json);

      console.log("adding a new note");
    const note = {
      "_id": "6207deb2f4b250f1d0ba25d3",
      "user": "62079235e69c18eb3faae361",
      "title": "My nwwwwee",
      "description": "This is the new description22 theree updated.",
      "tag": "proffesional",
      "date": "2022-02-12T16:22:10.615Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  // Delete a Note


  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwNzkyMzVlNjljMThlYjNmYWFlMzYxIn0sImlhdCI6MTY0NTAyNTkyN30.uMaBhhraPbjbFi66vqhg9IJlMNbqwBKltPZBRwPuJ54"
      },
    });
    const json = response.json();
    console.log(json);

    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwNzkyMzVlNjljMThlYjNmYWFlMzYxIn0sImlhdCI6MTY0NTAyNTkyN30.uMaBhhraPbjbFi66vqhg9IJlMNbqwBKltPZBRwPuJ54"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))


    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;