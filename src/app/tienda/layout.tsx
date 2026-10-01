import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Header />

      {/* Store Banner */}
      <div className="relative w-full pt-[4.4rem]">
        <div className="relative overflow-hidden bg-gradient-to-b from-accent/[0.06] to-transparent py-12 px-8">
          {/* Decorative orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(144,0,250,0.1)_0%,transparent_70%)] pointer-events-none" />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[80rem] mx-auto px-4 md:px-8 pb-16 -mt-8 flex flex-col lg:flex-row gap-6 relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
