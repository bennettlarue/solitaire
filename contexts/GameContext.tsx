"use client";

import { Context, createContext, useReducer } from "react";
import React from "react";

import {
  GameState,
  Move,
  Card,
  Pile,
  PileId,
  CardId,
  Suit,
  Rank,
} from "@/app/types";

function gameReducer(state: GameState, action: Move): GameState {
  switch (action.type) {
    case "FLIP_STOCK": {
      const stockPile = state.piles[state.stock];
      const wastePile = state.piles[state.waste];

      const cardsToFlip = stockPile.cards.slice(-state.flipCount);

      return {
        ...state,
        piles: {
          ...state.piles,
          [state.stock]: {
            ...stockPile,
            cards: stockPile.cards.slice(0, -state.flipCount),
          },
          [state.waste]: {
            ...wastePile,
            cards: [...wastePile.cards, ...cardsToFlip],
          },
        },
        cards: {
          ...state.cards,
          ...cardsToFlip.reduce(
            (acc, cardId) => ({
              ...acc,
              [cardId]: { ...state.cards[cardId], faceUp: true },
            }),
            {}
          ),
        },
      };
    }

    case "MOVE_CARDS": {
      const { fromPile, toPile, cardIds } = action;
      const fromPileData = state.piles[fromPile];
      const toPileData = state.piles[toPile];

      return {
        ...state,
        piles: {
          ...state.piles,
          [fromPile]: {
            ...fromPileData,
            cards: fromPileData.cards.filter((id) => !cardIds.includes(id)),
          },
          [toPile]: {
            ...toPileData,
            cards: [...toPileData.cards, ...cardIds],
          },
        },
      };
    }

    default:
      return state;
  }
}

function initializeGameState(): GameState {
  const suits: Suit[] = ["c", "d", "h", "s"];
  const cards: Record<CardId, Card> = {};
  const cardIds: CardId[] = [];

  // Create a standard 52-card deck
  suits.forEach((suit) => {
    for (let rank = 1; rank <= 13; rank++) {
      const cardId = `${suit}${rank}`;
      cards[cardId] = {
        id: cardId,
        suit,
        rank: rank as Rank,
        faceUp: false,
        initiallyFaceUp: false,
        moveable: false,
      };
      cardIds.push(cardId);
    }
  });

  // Shuffle the deck
  for (let i = cardIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardIds[i], cardIds[j]] = [cardIds[j], cardIds[i]];
  }

  // Create piles
  const piles: Record<PileId, Pile> = {};
  const tableaus: PileId[] = [];
  const foundations: PileId[] = [];

  // Create tableau piles (7 columns)
  for (let i = 0; i < 7; i++) {
    const pileId = `tableau-${i}`;
    tableaus.push(pileId);
    piles[pileId] = {
      id: pileId,
      type: "tableau",
      cards: [],
    };
  }

  // Create foundation piles (4 suits)
  suits.forEach((suit, i) => {
    const pileId = `foundation-${suit}`;
    foundations.push(pileId);
    piles[pileId] = {
      id: pileId,
      type: "foundation",
      cards: [],
    };
  });

  // Create stock pile
  const stockId = "stock";
  piles[stockId] = {
    id: stockId,
    type: "stock",
    cards: [...cardIds],
  };

  // Create waste pile
  const wasteId = "waste";
  piles[wasteId] = {
    id: wasteId,
    type: "waste",
    cards: [],
  };

  const generated = true;

  return {
    generated,
    cards,
    piles,
    tableaus,
    foundations,
    stock: stockId,
    waste: wasteId,
    flipCount: 1,
  };
}

export const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<Move>;
} | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  // Ensure initialization only happens once, even in StrictMode
  const initialState = React.useMemo(() => initializeGameState(), []);
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
