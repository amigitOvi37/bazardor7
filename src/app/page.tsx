import Hero from "./components/Hero";
import PrcIncrease from "./components/PrcIncrease";
import PrcDecrease from "./components/PrcDecrease";
import { Suspense } from "react";
import AllItems from "./components/AllItems";

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-10 animate-pulse">
            Loading...
          </div>
        }
      >
        <PrcIncrease />
        <PrcDecrease />
        <AllItems />
      </Suspense>
    </div>
  );
}
