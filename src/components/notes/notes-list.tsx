'use client';

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, HamburgerMenuIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function NoteList() {
  const [notes, setNotes] = useState<NoteProps[]>([]);

  useEffect(() => {
    invoke<string>('get_notes')
      .then((result) => setNotes(JSON.parse(result)))
      .catch(console.error);
  }, []);

  return (
    <Card className="w-[16rem] flex-shrink-0">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center justify-between">
          My notes
          <Button variant="ghost" size="icon">
            <ChevronLeftIcon />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 flex flex-col items-center">
        <ScrollArea className="w-full h-96">
          {notes.map((note) => {
            return (
              <Button key={note.id} className="flex items-center justify-start gap-3 my-2 w-full" variant="outline">
                <HamburgerMenuIcon className="size-4 cursor-grab" />
                {note.title}
              </Button>
            );
          })}
        </ScrollArea>
        <Separator orientation="horizontal" className="my-2" />
        <div className="mt-4 flex flex-col gap-3">
          <Input placeholder="Search note..." />
          <Button size="icon" className="flex w-full gap-3 text-md">
            <PlusCircledIcon />
            <span className="font-semibold">Add Note</span>
          </Button>
        </div>
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
