import { Header } from "@/components/Header";
import { HeroSpecimen } from "@/components/hero/HeroSpecimen";
import { PhilosophyCounterpointStrikethrough } from "@/components/sections/philosophy/PhilosophyCounterpointStrikethrough";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSpecimen />
        <PhilosophyCounterpointStrikethrough />
      </main>
    </>
  );
}
