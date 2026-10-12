import Hero from "./components/Hero";
import PrcIncrease from "./components/PrcIncrease";
import PrcDecrease from "./components/PrcDecrease";
import AllItems from "./components/AllItems";

export default function Home() {
  return (
    <div>
      <Hero />
      <PrcIncrease />
      <PrcDecrease />
      <AllItems />
    </div>
  );
}
