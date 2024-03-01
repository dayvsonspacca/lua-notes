import { HeartFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="px-3 py-2 flex items-center justify-center h-8">
            <span>Made with  <HeartFilledIcon className="text-red-500 inline"/>  by <Link href="https://github.com/dayvsonspacca" prefetch target="_blank" className="underline text-blue-400">dayvsonspacca</Link></span>
        </footer>
    );
}
