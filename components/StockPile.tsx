"use client";

import * as React from "react";
import { GameContext } from "../contexts/GameContext";
import Card from "@/components/Card";
import { AnimatePresence } from "motion/react";
import Pile from "./Pile";
import dynamic from "next/dynamic";

function StockPileComponent() {
  const { state, dispatch } = React.useContext(GameContext)!;

  const handleClick = () => {
    dispatch({
      type: "FLIP_STOCK",
    });
  };

  const stockCards = state.piles.stock.cards;

  return (
    <AnimatePresence>
      <div className="p-2 bg-green-200 w-22 h-28 relative" onClick={handleClick}>
        <Pile pileId={state.stock} cards={stockCards} />
      </div>
    </AnimatePresence>
  );
}

// Disable SSR to prevent hydration mismatch from Math.random()
const StockPile = dynamic(() => Promise.resolve(StockPileComponent), {
  ssr: false,
  loading: () => <div className="p-2 bg-green-200 w-22 h-28">Loading...</div>,
});

export default StockPile;
