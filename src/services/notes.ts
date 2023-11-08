import { Service, Inject } from "typedi";
import { INote, INoteInputDTO } from "../interfaces/INote.js";

@Service()
export default class NoteService {
  constructor(
    @Inject("noteModel")
    private noteModel: Models.NoteModel
  ) {}

  public async GetNotes(userId: string): Promise<INote[]> {
    try {
      const notes = await this.noteModel.find({ user: userId });
      return notes;
    } catch (e) {
      throw e;
    }
  }

  public async GetNote(noteId: string): Promise<INote> {
    try {
      const note = await this.noteModel.findById(noteId);
      return note;
    } catch (e) {
      throw e;
    }
  }

  public async PostNote(noteInput: INoteInputDTO, userId: string): Promise<INote> {
    try {
      const newNote = new this.noteModel({ ...noteInput, user: userId });
      const savedNote = await newNote.save();
      return savedNote;
    } catch (e) {
      throw e;
    }
  }

  public async UpdateNote(noteId: string, noteInput: INoteInputDTO): Promise<INote> {
    try {
      const updatedNote = await this.noteModel.findByIdAndUpdate(
        noteId,
        noteInput,
        {
          new: true,
        }
      );
      return updatedNote;
    } catch (e) {
      throw e;
    }
  }

  public async DeleteNote(noteId: string): Promise<INote> {
    try {
      const deletedNote = await this.noteModel.findByIdAndDelete(noteId);
      return deletedNote;
    } catch (e) {
      throw e;
    }
  }

}
