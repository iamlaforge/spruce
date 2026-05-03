import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroReduced } from "@/components/hero/HeroReduced";
import { EndToEnd } from "@/components/sections/EndToEnd";
import { FAQModule } from "@/components/sections/FAQModule";
import { InstallParallel } from "@/components/sections/install/InstallParallel";
import { PhilosophyCounterpointStrikethrough } from "@/components/sections/philosophy/PhilosophyCounterpointStrikethrough";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroReduced />
        <PhilosophyCounterpointStrikethrough />
        <EndToEnd />
        <FAQModule />
        <InstallParallel />
      </main>
      <Footer />
    </>
  );
}
