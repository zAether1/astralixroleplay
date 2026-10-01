import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LandingPage from "@/components/landing/LandingPage";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}
