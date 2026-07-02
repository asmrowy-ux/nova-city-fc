import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";

export default async function LegalPage({ params }: { params: { slug: string } }) {
  const [pageData, settings] = await Promise.all([
    client.fetch(`*[_type == "legalPage" && slug.current == $slug][0]`, { slug: params.slug }),
    client.fetch(`*[_type == "siteSettings"][0]{ title, logo { asset { _ref } } }`)
  ]);

  if (!pageData) {
    return (
      <main className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <div className="pt-48 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh] text-center">
          <h1 className="text-4xl font-black mb-4">Nie znaleziono strony</h1>
          <p className="text-gray-400">Podana strona prawna nie istnieje lub została usunięta.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="pt-48 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Klub</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">{pageData.title}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 border-b border-border pb-6">
          {pageData.title}
        </h1>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
          {pageData.content ? (
            <PortableText value={pageData.content} />
          ) : (
            <p>Brak treści.</p>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
