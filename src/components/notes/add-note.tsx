import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';

export function AddNote() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" className="flex w-full gap-3 text-sm">
          <PlusCircledIcon className="size-[1.2rem]" />
          <span className="font-semibold hidden md:inline">Add Note</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add note</AlertDialogTitle>
          <AlertDialogDescription>
            <Input placeholder="Note name..." type="text" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
