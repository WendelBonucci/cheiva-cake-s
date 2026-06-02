"use client";
import { useEffect, useState } from "react";
import Logo from "./Sections/Logo";
import Navigation from "./Sections/Navigation";
import Buttons from "./Sections/Buttons";
import Sidebar from "./Sections/Sidebar";
import SeachBar from "./Sections/SeachBar"; // Corrigido o import para bater com seu arquivo se necessário
import Departament from "./Sections/Departament";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 768);
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
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b flex flex-col justify-center
            ${scrolled
                    ? "bg-white/95 backdrop-blur-md border-black/5 shadow-sm py-2"
                    : "bg-white border-transparent py-4 md:py-5"
                }`}
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3 md:gap-4">

                <div className="flex items-center justify-between gap-4 md:gap-8">
                    <div className="shrink-0">
                        <Logo />
                    </div>

                    {!isMobile && (
                        <div className="flex-1 max-w-xl mx-auto w-full">
                            <SeachBar />
                        </div>
                    )}

                    {!isMobile ? (
                        <div className="shrink-0">
                            <Buttons />
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <Sidebar />
                        </div>
                    )}
                </div>

                {!isMobile ? (
                    <div className={`flex items-center justify-between border-t border-black/5 pt-3 transition-all duration-300 ${scrolled ? "hidden" : "flex"}`}>
                        <div className="flex items-center gap-6">
                            <Departament />
                            <div className="h-4 w-px bg-black/10" />
                            <Navigation />
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        <SeachBar />
                    </div>
                )}
            </div>
        </header>
    );
}