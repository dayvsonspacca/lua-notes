'use client';

import { NoteBlock } from '@/components/notes/note-block';
import { NotesList } from '@/components/notes/notes-list';
import { useEffect, useState, Suspense } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { NoteProps } from '@/types';
import { useSearchParams } from 'next/navigation';

function Search() {
  const [note, setNote] = useState<NoteProps>();
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    invoke<string>('get_note', { id })
      .then((result) => {
        let parsed: NoteProps = JSON.parse(result);
        setNote(parsed)
      })
      .catch(console.error);
  }, [id]);

  return <NoteBlock note={note}/>
}

export default function Note() {
  return (
    <main className="flex gap-4 mt-10 mx-3 my-2 h-full overflow-hidden">
      <NotesList />
      <Suspense fallback={<div className='hidden'></div>}>
        <Search />
      </Suspense>
    </main>
  )
}