'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, HamburgerMenuIcon, PlusCircledIcon, TextAlignBottomIcon, TextAlignTopIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function NoteList() {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [search, setSearch] = useState<string>('');
  const [opened, setOpen] = useState<boolean>(true);
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
    <div className={opened ? 'w-[16rem] flex-shrink-0 relative' : 'w-0 relative'}>
      <Button variant="ghost" size="icon" onClick={() => setOpen(!opened)} className="absolute top-[50%] right-[-1.7rem]">
        {opened ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Button>
      {opened && (
        <Card className="h-full transition-all">
          <CardHeader className="p-4">
            <CardTitle className="flex items-center justify-between">
              My notes
              <Button variant="ghost" size="icon" onClick={() => setOrder(!order)}>
                {order ? <TextAlignBottomIcon /> : <TextAlignTopIcon />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 flex flex-col items-center">
            <ScrollArea className="w-full h-[30vh]">
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
              <Input placeholder="Search note..." value={search} onInput={handleInputChange} />
              <Button size="icon" className="flex w-full gap-3 text-md">
                <PlusCircledIcon />
                <span className="font-semibold">Add Note</span>
              </Button>
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
