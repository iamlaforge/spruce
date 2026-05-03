import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroReduced } from "@/components/hero/HeroReduced";
import { Demonstration } from "@/components/sections/Demonstration";
import { FAQModule } from "@/components/sections/FAQModule";
import { InstallParallel } from "@/components/sections/install/InstallParallel";
import { PhilosophyCounterpointStrikethrough } from "@/components/sections/philosophy/PhilosophyCounterpointStrikethrough";
import { TerminalConversation } from "@/components/sections/TerminalConversation";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroReduced />
        <PhilosophyCounterpointStrikethrough />
        <Demonstration />
        <TerminalConversation />
        <FAQModule />
        <InstallParallel />
      </main>
      <Footer />
    </>
  );
}
