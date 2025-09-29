"use client";

import * as React from "react";
import { GameContext } from "../contexts/GameContext";
import Card from "@/components/Card";
import { AnimatePresence } from "motion/react";
import { CardId } from "@/app/types";

export interface IPileProps {
  handleClick?: React.MouseEventHandler;
  cards: CardId[];
}

export default function Pile(props: IPileProps) {
  const { state } = React.useContext(GameContext)!;
  const { handleClick, cards } = props;

  return (
    <>
      {Object.values(cards).map((cardId) => {
        return (
          <Card
            key={cardId}
            layoutId={"card-" + cardId}
            faceUp={
              state.cards[cardId].faceUp ? state.cards[cardId].faceUp : false
            }
            suit={state.cards[cardId].suit}
            rank={state.cards[cardId].rank}
          />
        );
      })}
    </>
  );
}
