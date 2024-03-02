import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, HamburgerMenuIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function NoteList() {
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
          {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]).map((i) => {
            return (
              <Button key={i} className="flex items-center justify-start gap-3 my-2 w-full" variant="outline">
                <HamburgerMenuIcon className="size-4 cursor-grab" />
                Note {i}
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
