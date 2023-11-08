import { useEffect } from "react";
import { useNotes } from "../context/NoteContext";
import ViewNote from "../components/note/ViewNote";
import NewNote from "../components/note/NewNote";

function NotesPage() {
  const { getNotes, notes, searchNotes } = useNotes();

  useEffect(() => {
    getNotes();
  }, []);

  const searchTerms = searchNotes.toLowerCase().match(/[^ ]+/g) || [];

  const isSearchResult = (note) =>
    searchTerms.length == 0 || searchTerms.every((word) => note.title.toLowerCase().includes(word)) ||
    searchTerms.every((word) => note.description.toLowerCase().includes(word));

  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center">
      <NewNote />
      {notes
        .filter((note) => isSearchResult(note))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((note) => (
          <ViewNote key={note._id} note={note} searchTerms={searchTerms} />
        ))}
    </div>
  );
}

export default NotesPage;
