"use client";
import { FiUser } from "react-icons/fi";
import Link from "next/link";

export default function User() {
    return (
        <Link href='' className="p-3 rounded-xl bg-background text-black hover:bg-beige/50 hover:text-black transition-all duration-200 group">
            <FiUser size={22} className="group-hover:scale-105 transition-transform" />
        </Link>
    );
}