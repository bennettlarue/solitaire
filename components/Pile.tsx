"use client";

import * as React from "react";
import { GameContext } from "../contexts/GameContext";
import Card from "@/components/Card";
import { CardId, PileId } from "@/app/types";

export interface IPileProps {
  pileId: PileId;
  cards: CardId[];

  yOffset?: number;
}

export default function Pile(props: IPileProps) {
  const { state } = React.useContext(GameContext)!;
  const { pileId, cards } = props;

  return (
    <>
      {Object.values(cards).map((cardId, index) => {
        const card = state.cards[cardId];

        return (
          <Card
            yOffset={index * -0.2}
            scale={1 + index * 0.002}
            key={cardId}
            cardId={cardId}
            sourcePileId={pileId}
            stackIndex={index}
            layoutId={"card-" + cardId}
            initiallyFaceUp={card.initiallyFaceUp}
            faceUp={card.faceUp}
            suit={card.suit}
            rank={card.rank}
          />
        );
      })}
    </>
  );
}
