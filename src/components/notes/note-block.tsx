import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

export function NoteBlock() {
    return (
        <Card className="size-full">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-between">
                    Note name
                    <div className="flex items-center gap-4">
                        <Button size="icon" variant="destructive">
                            <TrashIcon className="size-[1.2rem]"/>
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
        </Card>
    );
}