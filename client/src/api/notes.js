import axios from "./axios";

export const getNotesRequest = () => axios.get("/notes");

export const getNoteRequest = (id) => axios.get(`/notes/${id}`);

export const createNoteRequest = (note) => axios.post("/notes", note);

export const updateNoteRequest = (id, note) =>
  axios.patch(`/notes/${id}`, note);

export const deleteNoteRequest = (id) => axios.delete(`/notes/${id}`);