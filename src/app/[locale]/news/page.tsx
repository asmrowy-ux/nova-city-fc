import { client } from "@/sanity/lib/client";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function NewsPage() {
  const t = await getTranslations("NewsGrid");
  
  // Fetch posts and settings from Sanity
  const [posts, settings] = await Promise.all([
    client.fetch(`*[_type == "post"] | order(publishedAt desc)`),
    client.fetch(`*[_type == "siteSettings"][0]{ logo { asset { _ref } } }`)
  ]);

  function getImageUrl(ref: string) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  const clubLogoUrl = getImageUrl(settings?.logo?.asset?._ref);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="pt-48 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[70vh]">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">
          {t('latest')} <span className="text-primary">{t('stories')}</span>
        </h1>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-secondary/50 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-4 text-gray-500 dark:text-gray-400">No news articles found.</h2>
            <p className="text-gray-400 dark:text-gray-500">Go to /studio to add some posts!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link href={`/news/${post.slug?.current || '#'}`} key={post._id} className="group cursor-pointer">
                <div className="h-64 bg-secondary rounded-xl overflow-hidden mb-4 relative flex items-center justify-center">
                  {post.mainImage ? (
                    <>
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                           style={{ backgroundImage: `url(${getImageUrl(post.mainImage.asset._ref)})` }} />
                      <div className="absolute inset-0 bg-gradient-animated opacity-20 pointer-events-none z-10" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-animated flex items-center justify-center overflow-hidden">
                      {clubLogoUrl ? (
                        <img src={clubLogoUrl} alt="Logo" className="w-20 h-20 object-contain opacity-50 drop-shadow-2xl z-10" />
                      ) : (
                        <span className="text-primary font-black text-4xl opacity-50 z-10">NC</span>
                      )}
                      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{post.category || 'News'}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{post.title}</h3>
                {post.publishedAt && (
                  <p className="text-xs text-gray-500 mt-2">{new Date(post.publishedAt).toLocaleDateString()}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
