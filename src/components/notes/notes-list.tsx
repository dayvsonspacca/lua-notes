import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function NoteList() {
    return (
        <Card className="w-[16rem] h-full">
            <CardHeader>
                <CardTitle>My notes</CardTitle>
            </CardHeader>
        </Card>
    );
}
