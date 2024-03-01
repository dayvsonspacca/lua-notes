import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Lua notes",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className + " flex justify-between flex-col h-screen"}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Header />
                    {children}
                    <Footer/>
                </ThemeProvider>
            </body>
        </html>
    );
}
