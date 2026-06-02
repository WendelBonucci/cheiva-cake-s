"use client";
import { useEffect, useState } from "react";
import Logo from "./Sections/Logo";
import Navigation from "./Sections/Navigation";
import Buttons from "./Sections/Buttons";
import Sidebar from "./Sections/Sidebar";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 768); // Ajustado para o padrão md (768px)
        checkScreen();

        const handleScroll = () => setScrolled(window.scrollY > 20);

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", checkScreen);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkScreen);
        };
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b flex items-center
            ${scrolled ? "h-16 bg-white/95 backdrop-blur-md border-black/5 shadow-sm" : "h-24 bg-transparent border-transparent"}`}>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                <div className="shrink-0"><Logo /></div>

                {!isMobile ? (
                    <div className="flex items-center gap-8">
                        <Navigation />
                        <div className="h-6 w-px bg-black/10" />
                        <Buttons />
                    </div>
                ) : (
                    <div className="flex items-center">
                        <Sidebar />
                    </div>
                )}
            </div>
        </header>
    );
}