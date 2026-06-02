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
        const checkScreen = () => setIsMobile(window.innerWidth <= 748);
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
            className={`fixed top-0 w-full z-50 transition-all duration-500 border-b 
            ${scrolled
                    ? "h-16 bg-white/80 backdrop-blur-md border-gray/20 shadow-md"
                    : "h-24 bg-white border-transparent"}`}>
            <div className="" />

            <section className="">

                <div className=""><Logo /></div>

                <div className=""><Navigation /></div>

                {isMobile && (
                    <div className=""><Sidebar /></div>
                )}
            </section>
        </header>
    );
}