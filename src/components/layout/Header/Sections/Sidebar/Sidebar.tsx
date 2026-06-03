"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import SidebarLink from "./Sections/SidebarLink";
import SidebarFooter from "./Sections/SidebarFooter";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (pathname) closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeMenu]);

  const mainLinks = [
    { id: 1, label: 'Home', href: '' },
    { id: 2, label: 'Sobre Nós', href: '' },
    {
      id: 3, label: 'Bolos', href: '',
      drop: [
        { id: 1, label: 'Bolo Caseiro', href: '/' },
        { id: 2, label: 'Bolos de Aniversário', href: '/' },
        { id: 3, label: 'Mini Bolos Confeitados', href: '/' },
      ],
    },
    {
      id: 4, label: 'Sobremesas', href: '',
      drop: [
        { id: 4, label: 'Pudim', href: '/' },
        { id: 5, label: 'Delícia de Abacaxi', href: '/' },
        { id: 6, label: 'Delícia de Morango', href: '/' },
        { id: 7, label: 'Din Dins', href: '/' },
      ],
    },
    { id: 5, label: 'Orçamento', href: '' },
  ];

  return (
    <>
      <button type="button" onClick={toggleMenu} aria-label="Abrir menu"
        className="flex items-center justify-center w-11 h-11 rounded-xl text-black border border-black/10 bg-background transition-all duration-200 hover:bg-beige/50">
        <FaBars size={18} />
      </button>

      {mounted && createPortal(
        <>
          <button type="button" onClick={closeMenu}
            className={`fixed inset-0 z-50 min-h-screen h-full transition-all duration-500 bg-black/30 backdrop-blur-xs ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          />
          <aside ref={sidebarRef}
            className={`fixed top-0 right-0 z-50 h-screen w-80 bg-white border-l border-black/5 shadow-[-20px_0_50px_rgba(0,0,0,0.05)] transform transition-transform duration-300 ease-in-out flex flex-col justify-between overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div>
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
                <span className="text-[11px] font-bold tracking-[0.2em] text-black/50 uppercase">
                  Cardápio Cheiva
                </span>

                <button type="button" onClick={closeMenu} aria-label="Fechar menu"
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-black/60 hover:text-red hover:bg-red/10 transition-all duration-200">
                  <FaTimes size={16} />
                </button>
              </div>

              <nav className="flex flex-col px-4 py-5 gap-2">
                {mainLinks.map((link) => (
                  <SidebarLink key={link.id} link={link} active={pathname === link.href}
                    onClose={closeMenu}
                  />
                ))}
              </nav>
            </div>

            <SidebarFooter onClose={closeMenu} />
          </aside>
        </>,
        document.body
      )}
    </>
  );
}