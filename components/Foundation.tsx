"use client";

import * as React from "react";
import { AnimatePresence } from "motion/react";
import Pile from "./Pile";
import dynamic from "next/dynamic";
import { CardId, PileId } from "@/app/types";
import { GameContext } from "../contexts/GameContext";

import { useRef } from "react";

interface IFoundationProps {
  pileId: PileId;
}

function FoundationComponent(props: IFoundationProps) {
  const { state } = React.useContext(GameContext)!;
  const { pileId } = props;
  const cards = state.piles[pileId].cards;

  const pileRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      <div
        className="p-2 bg-orange-200 w-22 h-28 relative"
        ref={pileRef}
        data-pile-id={pileId}
      >
        <Pile pileId={pileId} cards={cards} />
      </div>
    </AnimatePresence>
  );
}

// Disable SSR to prevent hydration mismatch from Math.random()
const Foundation = dynamic(() => Promise.resolve(FoundationComponent), {
  ssr: false,
  loading: () => <div className="p-2 bg-orange-200 w-22 h-28">Loading...</div>,
});

export default Foundation;
