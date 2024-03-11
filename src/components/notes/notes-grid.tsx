'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TextAlignBottomIcon, TextAlignTopIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { timeAgo } from '@/lib/utils';
import Link from 'next/link';
import { NoteProps } from '@/types';
import { AddNote } from './add-note';

export function NotesGrid() {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<boolean>(true);

  useEffect(() => {
    invoke<string>('get_notes')
      .then((result) => {
        let parsed: NoteProps[] = JSON.parse(result);
        parsed = parsed.filter((note) => note.title.toLocaleLowerCase().includes(search));

        if (order) {
          setNotes(parsed.sort((a, b) => (a.title > b.title ? 1 : -1)));
        } else {
          setNotes(parsed.sort((a, b) => (b.title > a.title ? 1 : -1)));
        }
      })
      .catch(console.error);
  }, [search, order, AddNote]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Card className="overflow-y-scroll w-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between">
          My notes
          <div className="mt-4 flex gap-3">
            <Button variant="outline" size="icon" onClick={() => setOrder(!order)} className="p-2">
              {order ? <TextAlignBottomIcon className="size-[1.2rem]" /> : <TextAlignTopIcon className="size-[1.2rem]" />}
            </Button>
            <Input placeholder="Search note..." value={search} onInput={handleInputChange} />
            <AddNote />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-wrap gap-4 justify-between">
        {notes.map((note, index) => {
          return (
            <Link key={index} href={'/note/?id=' + note.id} className="w-full md:w-[48%] lg:w-[30%]">
              <Card className="bg-background shadow-sm hover:bg-accent h-36">
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                  <CardDescription className="text-ellipsis truncate">{note.content ? note.content : "No content..."}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <span>{timeAgo(note.created_at)}</span>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
