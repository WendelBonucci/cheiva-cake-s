"use client";
import { useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

type DropItem = {
    label: string;
    href: string;
};

type MenuLink = {
    id?: number;
    label: string;
    href: string;
    drop?: DropItem[];
};

type SidebarLinkProps = {
    link: MenuLink;
    active: boolean;
    onClose: () => void;
};

export default function SidebarLink({ link, active, onClose, }: SidebarLinkProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    if (link.drop) {
        return (
            <div className="w-full flex flex-col">
                <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full px-4 py-2.5 text-sm font-semibold tracking-wide flex items-center justify-between text-black hover:text-yellow transition-colors duration-200">
                    <span>{link.label}</span>
                    <FaChevronDown
                        size={10}
                        className={`transform transition-transform duration-300 text-black/40 group-hover:text-yellow ${dropdownOpen ? "rotate-180 text-yellow" : ""}`}
                    />
                </button>

                <div className={`flex flex-col pl-4 gap-1 overflow-hidden transition-all duration-300 ${dropdownOpen ? "max-h-40 mt-1 opacity-100" : "max-h-0 opacity-0"}`}>
                    {link.drop.map((sub, index) => (
                        <Link key={index} href={sub.href} onClick={onClose} className="px-4 py-2 text-xs font-medium text-black/60 hover:text-yellow transition-colors">
                            {sub.label}
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <Link href={link.href} onClick={onClose}
            className={`px-4 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200 ${active
                ? "text-yellow font-bold"
                : "text-black/80 hover:text-yellow"}`}>
            {link.label}
        </Link>
    );
}