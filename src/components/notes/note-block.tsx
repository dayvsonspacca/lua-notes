import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LockOpen1Icon, MagicWandIcon, TrashIcon } from '@radix-ui/react-icons';
import { NoteProps } from '@/types';

export function NoteBlock({ note }: { note: NoteProps | undefined }) {
  return (
    <Card className="size-full transition-all">
      {note && (
        <>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-between">
              {note.title}
              <div className="flex items-center gap-4">
                <Button size="icon" className="bg-emerald-400 hover:bg-emerald-400/90 dark:text-white cursor-not-allowed" disabled={true}>
                  <MagicWandIcon className="size-[1.2rem]" />
                </Button>
                <Button size="icon" variant="outline">
                  <LockOpen1Icon className="size-[1.2rem]" />
                </Button>
                <Button size="icon" variant="destructive">
                  <TrashIcon className="size-[1.2rem]" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>{note.content}</CardContent>
        </>
      )}
    </Card>
  );
}
