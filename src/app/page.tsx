import { NoteBlock } from "@/components/notes/note-block";
import { NoteList } from "@/components/notes/notes-list";

export default function Home() {
    return (
        <main className="flex gap-4 mt-10 mx-3 my-2 h-full max-h-full">
            <NoteList />
            <NoteBlock />
        </main>
    );
}
