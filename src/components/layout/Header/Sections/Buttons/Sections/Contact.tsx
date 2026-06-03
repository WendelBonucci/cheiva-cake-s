"use client";
import { FiPhone } from "react-icons/fi";
import Link from "next/link";

export default function Contact() {
    return (
        <Link href='' className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 text-sm font-semibold text-black hover:bg-black hover:text-white transition-all duration-300">
            <FiPhone size={16} />
            <span>Contato</span>
        </Link>
    );
}