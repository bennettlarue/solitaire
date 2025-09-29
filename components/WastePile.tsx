"use client";

import * as React from "react";
import { GameContext } from "../contexts/GameContext";
import Card from "@/components/Card";
import { AnimatePresence } from "motion/react";
import Pile from "./Pile";
import dynamic from "next/dynamic";

function WastePileComponent() {
  const { state } = React.useContext(GameContext)!;
  const wasteCards = state.piles.waste.cards;

  return (
    <AnimatePresence>
      <div className="p-2 bg-red-200 w-22 h-28">
        <Pile pileId={state.waste} cards={wasteCards} />
      </div>
    </AnimatePresence>
  );
}

// Disable SSR to prevent hydration mismatch from Math.random()
const WastePile = dynamic(() => Promise.resolve(WastePileComponent), {
  ssr: false,
  loading: () => <div className="p-2 bg-red-200 w-22 h-28">Loading...</div>,
});

export default WastePile;
