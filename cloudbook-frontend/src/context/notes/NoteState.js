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

      console.log("adding a new note");
    const note = {
      "_id": "613b38abf3939941099799f2",
      "user": "613b03c1553bc98a4667bd6a",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-10T10:51:23.921Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  // Delete a Note

  const deleteNote = (id) => {
    // todo -API call
    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwNzkyMzVlNjljMThlYjNmYWFlMzYxIn0sImlhdCI6MTY0NTAyNTkyN30.uMaBhhraPbjbFi66vqhg9IJlMNbqwBKltPZBRwPuJ54"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();


    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;