import { useState } from "react";
import { createContext, useContext } from "react";
import { createNoteRequest, getNotesRequest, deleteNoteRequest, getNoteRequest, updateNoteRequest } from '../api/notes'

export const NoteContext = createContext();

export const useNotes = () => {
  const context = useContext(NoteContext);

  if (!context) {
    throw Error("useNotes must be used within a NoteProvider");
  }
  return context;
};

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [searchNotes, setSearchNotes] = useState('')
  
  const getNotes = async () => {
    try {
      const res = await getNotesRequest();
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getNote = async (id) => {
    let note = null;
    try {
      const res = await getNoteRequest(id)
      if (res.data) {
        note = res.data
      }
    } catch (error) {
      console.log(note);
    }
    return note;
  }

  const createNote = async (note) => {
    try {
      const res = await createNoteRequest(note);
      const newNotes = [...notes, res.data]
      setNotes(newNotes)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await deleteNoteRequest(id);
      if (res.status === 204) {
        setNotes(notes.filter(note => note._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateNote = async (id, note) => {
    try {
      const res = await updateNoteRequest(id, note);
      const newNotes = notes.map(note => note._id === id ? res.data : note);
      setNotes(newNotes);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <NoteContext.Provider value={{ notes, searchNotes, setSearchNotes, createNote, getNotes, deleteNote, getNote, updateNote }}>
      {children}
    </NoteContext.Provider>
  );
}
