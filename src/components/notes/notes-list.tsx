import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "../ui/scroll-area";

export function NoteList() {
    return (
        <Card className="w-[16rem] h-full">
            <CardHeader className="p-4">
                <CardTitle>My notes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-4 max-h-full">
                <ScrollArea className="w-full">
                    {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]).map(i => {
                        return (
                            <Button key={i} className="flex items-center justify-start gap-3" variant="outline">
                                <HamburgerMenuIcon className="size-4 cursor-grab"/>
                                Note {i}
                            </Button>
                        )
                    })}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
