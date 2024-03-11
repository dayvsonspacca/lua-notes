'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, HamburgerMenuIcon, PlusCircledIcon, TextAlignBottomIcon, TextAlignTopIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { AddNote } from './add-note';

export function NotesList() {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [search, setSearch] = useState<string>('');
  const [opened, setOpen] = useState<boolean>(true);
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
  }, [search, order]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={opened ? 'w-[16rem] flex-shrink-0 relative' : 'w-0 relative'}>
      <Button variant="ghost" size="icon" onClick={() => setOpen(!opened)} className="absolute top-[50%] right-[-1.7rem]">
        {opened ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Button>
      {opened && (
        <Card className="h-full">
          <CardHeader className="p-4">
            <CardTitle className="flex items-center justify-between">
              My notes
              <Button variant="ghost" size="icon" onClick={() => setOrder(!order)}>
                {order ? <TextAlignBottomIcon /> : <TextAlignTopIcon />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 flex flex-col items-center justify-between">
            <ScrollArea className="w-full h-[30vh]">
              {notes.map((note) => {
                return (
                  <Button key={note.id} asChild className="flex justify-start space-x-2 items-center my-2" variant="outline">
                    <Link href={'/note/?id=' + note.id}>
                      <HamburgerMenuIcon className="size-4" />
                      <span className="text-ellipsis truncate">{note.title}</span>
                    </Link>
                  </Button>
                );
              })}
            </ScrollArea>
            <Separator orientation="horizontal" className="my-2" />
            <div className="mt-4 flex flex-col gap-3">
              <Input placeholder="Search note..." value={search} onInput={handleInputChange} />
              <AddNote />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

type NoteProps = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};
