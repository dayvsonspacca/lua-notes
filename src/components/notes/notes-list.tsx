import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export function NoteList() {
    return (
        <Card className="w-[16rem]">
            <CardHeader className="p-4">
                <CardTitle>My notes</CardTitle>
            </CardHeader>
            <CardContent className="px-4">
                <ScrollArea className="w-full h-[26rem]">
                    {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]).map(i => {
                        return (
                            <Button key={i} className="flex items-center justify-start gap-3 my-2 w-full" variant="outline">
                                <HamburgerMenuIcon className="size-4 cursor-grab"/>
                                Note {i}
                            </Button>
                        )
                    })}
                </ScrollArea>
                <div className="mt-4 flex">
                    <Input placeholder="Search note..."/>
                </div>
            </CardContent>
        </Card>
    );
}
