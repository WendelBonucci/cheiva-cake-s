"use client";
import { FiShoppingBag } from "react-icons/fi";

export default function Cart() {

    return (
        <button type="button" className="relative p-3 rounded-xl bg-background text-black hover:bg-beige/50 hover:text-black transition-all duration-200 group">
            <FiShoppingBag size={22} className="group-hover:scale-105 transition-transform" />
        </button>
    );
}