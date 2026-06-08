import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Chatbot from "@/components/layout/Messeger/Messeger";

export const metadata = {
  title: "Cheiva Cake'S | Confeitaria de Bolos, Doces e Sobremesas",

  description:
    "A Cheiva Cake'S é especializada na produção de bolos artesanais, doces finos, sobremesas e encomendas para festas, aniversários, casamentos e eventos especiais. Sabor, qualidade e carinho em cada detalhe.",

  keywords: [
    "Confeitaria",
    "Bolos Artesanais",
    "Doces Finos",
    "Sobremesas",
    "Bolos Personalizados",
    "Bolos para Aniversário",
    "Bolos para Casamento",
    "Doces para Festa",
    "Encomenda de Bolos",
    "Cupcakes",
    "Brigadeiros Gourmet",
    "Confeitaria Artesanal",
    "Mesa de Doces",
    "Doceria",
    "Cheiva Cakes"
  ],

  authors: [
    {
      name: "Cheiva Cake'S",
      url: "https://seusite.com.br",
    },
  ],

  icons: {
    icon: "/logocheivacakes.png",
  },

  openGraph: {
    title: "Cheiva Cake'S | Bolos, Doces e Sobremesas Artesanais",
    description:
      "Encomende bolos personalizados, doces finos e sobremesas artesanais para tornar seus momentos ainda mais especiais. Qualidade, sabor e beleza em cada criação.",

    url: "https://seusite.com.br",

    siteName: "Cheiva Cake'S",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cheiva Cake'S - Confeitaria Artesanal",
      },
    ],

    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={''}>
      <Header />
      <body className="min-h-full flex flex-col">{children}</body>
      <Chatbot />
    </html>
  );
}
