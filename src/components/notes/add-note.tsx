'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { invoke } from '@tauri-apps/api/tauri';

const formSchema = z.object({
  noteName: z.string().min(2, {
    message: 'Note name must be at least 2 characters.',
  }),
});

export function AddNote() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noteName: '',
    },
  });

  function onSubmit({ noteName }: z.infer<typeof formSchema>) {
    invoke<string>('add_note', { name: noteName }).catch(console.error);
  }

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
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="noteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogAction asChild>
                <Button type="submit">Save changes</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
