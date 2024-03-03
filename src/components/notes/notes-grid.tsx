'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, HamburgerMenuIcon, PlusCircledIcon, TextAlignBottomIcon, TextAlignTopIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { timeAgo } from '@/lib/utils';
import Link from 'next/link';

export function NotesGrid() {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<boolean>(true);

  useEffect(() => {
    invoke<string>('get_notes')
      .then((result) => {
        let parsed: NoteProps[] = JSON.parse(result);
        parsed = parsed.filter((note) => note.title.includes(search));

        if (order) {
          setNotes(parsed.sort((a, b) => (a.title > b.title ? 1 : -1)));
        } else {
          setNotes(parsed.sort((a, b) => (b.title > a.title ? 1 : -1)));
        }
      })
      .catch(console.error);
  }, [search, order]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between">
          My notes
          <div className="mt-4 flex gap-3">
            <Input placeholder="Search note..." value={search} onInput={handleInputChange} />
            <Button size="icon" className="flex w-full gap-3 text-md">
              <PlusCircledIcon />
              <span className="font-semibold">Add Note</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-wrap gap-4">
        {notes.map((note) => {
          return (
            <Link href={'/note/' + note.id}>
              <Card className="w-[350px] bg-background shadow-sm hover:bg-accent">
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                  <CardDescription>{note.content}.</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <></>
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

type NoteProps = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};
