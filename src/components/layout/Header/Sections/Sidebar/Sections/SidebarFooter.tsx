"use client";
import Link from "next/link";
import { /* FiClock, FiMapPin, */ FiMessageSquare } from "react-icons/fi";

export default function SidebarFooter({ onClose, }: { onClose: () => void; }) {
    return (
        <div className="px-4 pb-6 pt-4 border-t border-black/5 bg-white">
            <div className="space-y-3">

                <Link href="/" onClick={onClose}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white bg-yellow 
                    hover:bg-yellow/90 active:scale-[0.99] transition-all shadow-[0_4px_15px_rgba(31,166,90,0.15)]">
                    <FiMessageSquare size={16} />
                    <span>Encomendas via WhatsApp</span>
                </Link>

                <div className="grid grid-cols-2 gap-2">
                    <Link href="/" onClick={onClose} className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold tracking-wide text-black border border-black/10 bg-background/40 hover:bg-beige/40 hover:border-beige transition-all">
                        
                        <span>Contato</span>
                    </Link>

                    <Link href="/" onClick={onClose} className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold tracking-wide text-black border border-black/10 bg-background/40 hover:bg-beige/40 hover:border-beige transition-all">
                       
                        <span>Orçamento</span>
                    </Link>
                </div>
            </div>

            <div className="mt-6 flex flex-col items-center">
                <div className="h-px w-3/4 bg-linear-to-r from-transparent via-beige to-transparent mb-3" />
                <span className="text-[10px] font-black tracking-[0.25em] text-black/40 uppercase select-none">
                    Cheiva Cake's
                </span>
            </div>
        </div>
    );
}