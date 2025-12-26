import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative">
        <div className="container mx-auto px-4 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
            Elegance, Redefined.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the art of bespoke jewelry. Create a piece that is uniquely yours, a reflection of your story and style.
          </p>
          <div className="mt-8">
            <Link
              href="/customize"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-10 py-4 text-base font-semibold uppercase tracking-widest hover:opacity-90 transition"
            >
              Start Creating
            </Link>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="relative h-[400px] md:h-[600px] rounded-t-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1611652032926-e4a82d279de4?w=1400&q=80&auto=format&fit=crop"
              alt="Elegant Jewelry"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-foreground mb-12">
            Featured Creations
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 border border-border text-center">
              <div className="relative h-64 rounded-md overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1617038220399-2b7c3e4a7f7c?w=800&q=80&auto=format&fit=crop"
                  alt="Jewelry piece 1"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground">The Stella Necklace</h3>
              <p className="mt-2 text-muted-foreground">A radiant piece to light up your look.</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border text-center">
              <div className="relative h-64 rounded-md overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1599643477891-5236ab19948a?w=800&q=80&auto=format&fit=crop"
                  alt="Jewelry piece 2"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground">The Orion Bracelet</h3>
              <p className="mt-2 text-muted-foreground">A celestial touch for your wrist.</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border text.center">
              <div className="relative h-64 rounded-md overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1611591437281-462bf4210483?w=800&q=80&auto-format&fit=crop"
                  alt="Jewelry piece 3"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground">The Luna Earrings</h3>
              <p className="mt-2 text-muted-foreground">A tribute to the beauty of the night sky.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Ready to tell your story?
          </h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Our customizer is designed to be a seamless and inspiring experience. Start creating your masterpiece today.
          </p>
          <div className="mt-8">
            <Link
              href="/customize"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-10 py-4 text-base font-semibold uppercase tracking-widest hover:opacity-90 transition"
            >
              Make Your Own
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
