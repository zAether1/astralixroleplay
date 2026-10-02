import { Header } from "@/components/layout/Header";
import { Footer01 } from "@/components/ui/footer-01";
import Image from "next/image";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer01 
        logo={
          <Image 
            src="/AstralixRPV1.png" 
            alt="Astralix Roleplay" 
            width={40} 
            height={40} 
            className="rounded-lg bg-primary/10 p-1"
          />
        }
      />
    </>
  );
}
