import { NoteBlock } from '@/components/notes/note-block';
import { NotesGrid } from '@/components/notes/notes-grid';

export default function Home() {
  return (
    <main className="flex gap-4 mt-10 mx-3 my-2 h-full">
      <NotesGrid />
    </main>
  );
}
