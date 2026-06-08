"use client";
import { useEffect, useRef, useState } from "react";
import { FiMessageSquare, FiX, FiCornerDownLeft } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

type Option = {
    text: string;
    nextNodeId: string;
};

type ChatNode = {
    id: string;
    text: string;
    options: Option[];
};

type Message = {
    id: string;
    sender: "bot" | "user";
    text: string;
};

const createMessage = (sender: Message["sender"], text: string): Message => ({
    id: crypto.randomUUID(),
    sender,
    text,
});

// substituir o número futuramente
const WHATSAPP_NUMBER = "5511999999999";

const chatScript: Record<string, ChatNode> = {
    start: {
        id: "start",
        text: "Olá! Seja muito bem-vindo(a) ao nosso atendimento virtual. Como posso adoçar o seu dia hoje? 🍰✨",
        options: [
            { text: "Encomendar Bolo de Festa / Aniversário", nextNodeId: "bolos_festa", },
            { text: "Ver Doces Disponíveis Pronta Entrega", nextNodeId: "pronta_entrega", },
            { text: "Dúvidas sobre Taxas de Entrega e Prazos", nextNodeId: "prazos_entrega", },
        ],
    },

    bolos_festa: {
        id: "bolos_festa",
        text: "Trabalhamos com bolos totalmente artesanais e personalizados! Para montarmos sua combinação perfeita de massa e recheio, prefere falar direto com uma confeiteira no WhatsApp?",
        options: [
            { text: "Sim, quero montar meu bolo pelo WhatsApp", nextNodeId: "whatsapp_bolo", },
            { text: "Ver outras opções no menu", nextNodeId: "start", },
        ],
    },

    pronta_entrega: {
        id: "pronta_entrega",
        text: "Nossos doces diários saem fresquinhos! Você pode dar uma olhada no catálogo da página ou ir direto para o fechamento via WhatsApp.",
        options: [
            { text: "Falar com atendente para Pronta Entrega", nextNodeId: "whatsapp_pronta", },
            { text: "Voltar ao menu inicial", nextNodeId: "start", },
        ],
    },

    prazos_entrega: {
        id: "prazos_entrega",
        text: "Para bolos festivos personalizados, pedimos o prazo de 24h a 48h de antecedência. Para entregas rápidas de fatias e doces do dia, consultamos os entregadores disponíveis.",
        options: [
            { text: "Consultar taxa para meu CEP (WhatsApp)", nextNodeId: "whatsapp_cep", },
            { text: "Voltar", nextNodeId: "start", },
        ],
    },

    final_whatsapp: {
        id: "final_whatsapp",
        text: "Perfeito! Estou te redirecionando para o nosso WhatsApp para que possamos te passar todas as atenções. Se a janela não abrir, clique no botão abaixo! 💚",
        options: [
            { text: "Reiniciar Conversa", nextNodeId: "start", },
        ],
    },
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        createMessage("bot", chatScript.start.text),
    ]);
    const [currentNode, setCurrentNode] = useState<ChatNode>(chatScript.start);
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleOptionClick = (option: Option) => {
        if (isTyping) return;

        setMessages((prev) => [...prev, createMessage("user", option.text)]);
        setIsTyping(true);

        timeoutRef.current = setTimeout(() => {
            let nextNodeKey = option.nextNodeId;
            let shouldOpenWhatsapp = false;
            let whatsappMessage = "";

            // Intercepta ações de redirecionamento para o WhatsApp
            if (nextNodeKey.startsWith("whatsapp_")) {
                shouldOpenWhatsapp = true;

                // Textos dinâmicos baseados na escolha do cliente
                if (nextNodeKey === "whatsapp_bolo") whatsappMessage = "Olá! Gostaria de fazer uma encomenda de bolo personalizado de festa.";
                if (nextNodeKey === "whatsapp_pronta") whatsappMessage = "Olá! Gostaria de saber quais são as opções de doces para pronta entrega hoje.";
                if (nextNodeKey === "whatsapp_cep") whatsappMessage = "Olá! Gostaria de consultar o prazo e a taxa de entrega para o meu endereço.";

                nextNodeKey = "final_whatsapp";
            }

            const nextNode = chatScript[nextNodeKey] ?? chatScript.start;
            setCurrentNode(nextNode);
            setMessages((prev) => [...prev, createMessage("bot", nextNode.text)]);
            setIsTyping(false);

            // Dispara a API oficial do WhatsApp em uma nova aba
            if (shouldOpenWhatsapp) {
                const encodedText = encodeURIComponent(whatsappMessage);
                window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedText}`, "_blank");
            }
        }, 750);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {!isOpen && (
                <button type="button" onClick={() => setIsOpen(true)} className="w-14 h-14 rounded-full bg-green hover:bg-green/90 text-white shadow-[0_4px_20px_rgba(31,166,90,0.3)] flex items-center justify-center transition-all duration-300 hover:scale-105">
                    <FiMessageSquare size={24} />
                </button>
            )}

            {isOpen && (
                <div className="w-80 sm:w-90 h-120 bg-white border border-black/5 rounded-2xl flex flex-col overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.12)]">

                    <div className="p-4 bg-beige/40 border-b border-beige/80 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-green animate-pulse" />
                            <h3 className="text-black font-bold text-sm tracking-wide">Dúvidas Frequentes</h3>
                        </div>

                        <button type="button" onClick={() => setIsOpen(false)} className="text-black/40 hover:text-black transition-colors">
                            <FiX size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fdfbf7]">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] rounded-2xl p-3 text-xs md:text-sm leading-relaxed ${msg.sender === "user"
                                    ? "bg-green text-white font-semibold rounded-br-none"
                                    : "bg-white text-black border border-black/5 font-medium rounded-bl-none shadow-xs"
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-black/5 rounded-2xl p-3 text-xs text-black/40 font-bold tracking-wide animate-pulse">
                                    Confeitaria digitando...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-black/5 bg-white">
                        {!isTyping && (
                            <div className="flex flex-col gap-2">
                                {currentNode.options.map((option) => {
                                    const isWhatsAppAction = option.nextNodeId.startsWith("whatsapp_");
                                    return (
                                        <button
                                            type="button"
                                            key={option.text}
                                            onClick={() => handleOptionClick(option)}
                                            className={`w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs text-left font-bold tracking-wide transition-all duration-200 border ${isWhatsAppAction
                                                ? "bg-green/10 border-green/30 text-green hover:bg-green/20"
                                                : "bg-[#fdfbf7] hover:border-green border-black/5 text-black/80 hover:text-green"
                                                }`}>
                                            {isWhatsAppAction ? (
                                                <FaWhatsapp size={14} className="shrink-0 text-green" />
                                            ) : (
                                                <FiCornerDownLeft size={14} className="text-green/50 shrink-0" />
                                            )}
                                            <span className="truncate">{option.text}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}