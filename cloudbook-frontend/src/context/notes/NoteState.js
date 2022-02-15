import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "6207deb2f4b2510f1d0ba25d3",
            "user": "62079235e69c18eb3faae361",
            "title": "My nw title2",
            "description": "This is the new description22.",
            "tag": "personal",
            "date": "2022-02-12T16:22:10.615Z",
            "__v": 0
        },
        {
            "_id": "6209279f59e2d59294ce5b044446d",
            "user": "62079235e69c18eb3faae361",
            "title": "My Title ****",
            "description": "This is the new description22 theree.",
            "tag": "proffesnal",
            "date": "2022-02-13T15:45:35.739Z",
            "__v": 0
        },
        {
            "_id": "6209279f59e2d59555294ce5b06d",
            "user": "62079235e69c18eb3faae361",
            "title": "My Title ****",
            "description": "This is the new description22 theree.",
            "tag": "proffesnal",
            "date": "2022-02-13T15:45:35.739Z",
            "__v": 0
        },
        {
            "_id": "6209279f59e2d59294ce5b55506d",
            "user": "62079235e69c18eb3faae361",
            "title": "My Title ****",
            "description": "This is the new description22 theree.",
            "tag": "proffesnal",
            "date": "2022-02-13T15:45:35.739Z",
            "__v": 0
        },
        {
            "_id": "6209279f59e2d59294444ce5b06d",
            "user": "62079235e69c18eb3faae361",
            "title": "My Title ****",
            "description": "This is the new description22 theree.",
            "tag": "proffesnal",
            "date": "2022-02-13T15:45:35.739Z",
            "__v": 0
        },
        {
            "_id": "6209279f59e2d59294555ce5b06d",
            "user": "62079235e69c18eb3faae361",
            "title": "My Title ****",
            "description": "This is the new description22 theree.",
            "tag": "proffesnal",
            "date": "2022-02-13T15:45:35.739Z",
            "__v": 0
        }
    ];

    const [notes, setNotes] = useState(notesInitial);


    // Add a Note
    const addNote = (title, description, tag) => {
        //TODO: API call
         const note = {
            "_id": "6209279f59e2d592jhhdj94555ce5b06d",
            "user": "62079235e69c18eb3faae361",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-02-13T15:45:35.739Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    //   Delete a Note
    const deleteNote = () => {

    }


    // Edit a Note
    const editNote = () => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;