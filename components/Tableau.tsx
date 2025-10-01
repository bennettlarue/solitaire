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

  const buildCardTree = (startIndex: number): React.ReactNode => {
    if (startIndex >= tableauCards.length) return null;

    const cardId = tableauCards[startIndex];
    const card = state.cards[cardId];
    const cardYOffset = startIndex === 0 ? 0 : 20;

    const cardIdsInStack = tableauCards.slice(startIndex);

    const childCard = buildCardTree(startIndex + 1);

    return (
      <Card
        yOffset={cardYOffset}
        key={cardId}
        cardId={cardId}
        sourcePileId={pileId}
        stackIndex={startIndex}
        cardsIdsInStack={cardIdsInStack}
        layoutId={"card-" + cardId}
        initiallyFaceUp={false}
        faceUp={card.faceUp}
        suit={card.suit}
        rank={card.rank}
      >
        {childCard}
      </Card>
    );
  };

  const cardTree = buildCardTree(0);

  return (
    <AnimatePresence>
      <div
        ref={pileRef}
        data-pile-id={pileId}
        className="p-2 bg-blue-200 w-22 h-28"
      >
        {/* <Pile yOffset={30} pileId={pileId} cards={tableauCards} /> */}
        {cardTree}
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
