import ProductMain from "@/components/Home/Sections/ProductMain/ProductMain";

interface PageProps {
  readonly params: {
    readonly id: string;
  };
}

export default async function Page({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-white">
      <ProductMain params={params} />
    </main>
  );
}