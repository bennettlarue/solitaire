"use client";

import * as React from "react";
import { GameContext } from "../contexts/GameContext";
import Card from "@/components/Card";
import { AnimatePresence } from "motion/react";
import { CardId, PileId } from "@/app/types";

export interface IPileProps {
  pileId: PileId;
  cards: CardId[];
}

export default function Pile(props: IPileProps) {
  const { state } = React.useContext(GameContext)!;
  const { pileId, cards } = props;

  return (
    <>
      {Object.values(cards)
        .slice(-5)
        .map((cardId, index) => {
          const card = state.cards[cardId];

          return (
            <Card
              key={cardId}
              cardId={cardId}
              sourcePileId={pileId}
              stackIndex={index}
              layoutId={"card-" + cardId}
              initiallyFaceUp={false}
              faceUp={card.faceUp}
              suit={card.suit}
              rank={card.rank}
            />
          );
        })}
    </>
  );
}
