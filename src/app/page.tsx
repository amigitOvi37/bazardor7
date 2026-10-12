import Hero from "./components/Hero";
import PrcIncrease from "./components/PrcIncrease";
import PrcDecrease from "./components/PrcDecrease";
import AllItems from "./components/AllItems";
import { ThreeDot } from "react-loading-indicators";

export default function Home() {
  return (
    <div>
      <Hero />
      <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
      <PrcIncrease />
      <PrcDecrease />
      <AllItems />
    </div>
  );
}
