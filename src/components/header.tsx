import { Button } from "@/components/ui/button";
import { ToggleTheme } from "./toggle-theme";
import { GearIcon, MoonIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function Header() {
    return (
        <header className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-4">
                <MoonIcon className="size-8" />
                <span className="text-2xl font-semibold">Lua notes</span>
                <div className="flex items-center gap-4">
                    <Button asChild variant="link">
                        <Link href="/">My notes</Link>
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Button size="icon" variant="outline">
                    <GearIcon className="size-[1.2rem]" />
                </Button>
                <ToggleTheme />
            </div>
        </header>
    );
}
