"use client";

import * as React from "react";
import { GameContext } from "../contexts/GameContext";
import Card from "@/components/Card";
import { AnimatePresence } from "motion/react";
import Pile from "./Pile";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { PileId } from "@/app/types";

export interface ITableauProps {
  pileId: PileId;
}

function TableauComponent(props: ITableauProps) {
  const { pileId } = props;
  const { state } = React.useContext(GameContext)!;
  const tableauCards = state.piles[pileId].cards;
  const pileRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      <div
        ref={pileRef}
        data-pile-id={pileId}
        className="p-2 bg-blue-200 w-22 h-28"
      >
        <Pile yOffset={30} pileId={pileId} cards={tableauCards} />
      </div>
    </AnimatePresence>
  );
}

// Disable SSR to prevent hydration mismatch from Math.random()
const Tableau = dynamic(() => Promise.resolve(TableauComponent), {
  ssr: false,
  loading: () => <div className="p-2 bg-green-200 w-22 h-28">Loading...</div>,
});

export default Tableau;
