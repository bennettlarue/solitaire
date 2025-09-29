"use client";

import * as React from "react";
import { GameContext } from "../contexts/GameContext";
import Card from "@/components/Card";
import { AnimatePresence } from "motion/react";
import Pile from "./Pile";
import dynamic from 'next/dynamic';

function WastePileComponent() {
  const { state, dispatch } = React.useContext(GameContext)!;

  return (
    <AnimatePresence>
      <div className="p-2 bg-red-200 w-22 h-28">
        <Pile
          cards={
            state.piles.waste.cards.length > 0
              ? [state.piles.waste.cards[state.piles.waste.cards.length - 1]]
              : []
          }
        />
      </div>
    </AnimatePresence>
  );
}

// Disable SSR to prevent hydration mismatch from Math.random()
const WastePile = dynamic(() => Promise.resolve(WastePileComponent), {
  ssr: false,
  loading: () => <div className="p-2 bg-red-200 w-22 h-28">Loading...</div>
});

export default WastePile;
