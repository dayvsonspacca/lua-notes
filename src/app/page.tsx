import { NoteBlock } from "@/components/notes/note-block";
import { NoteList } from "@/components/notes/notes-list"

export default function Home() {
  return (
    <main className="mx-3 my-2 flex gap-4 mt-10">
      <NoteList/>
      <NoteBlock />
    </main>
  );
}
