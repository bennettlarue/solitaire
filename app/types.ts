export type Suit = "c" | "d" | "h" | "s";
export type CardId = string;
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type PileType = "stock" | "waste" | "foundation" | "tableau";
export type PileId = string;

export type Move =
  | { type: "CYCLE_SINGLE_STOCK" }
  | {
      type: "MOVE_CARDS";
      fromPile: PileId;
      toPile: PileId;
      cardIds: CardId[];
    }
  | {
      type: "DEAL_SINGLE_CARD";
      tableauIndex: number;
    }
  | { type: "RESET_GAME" }
  | { type: "REVEAL_SINGLE_CARD"; cardId: CardId };

export interface Card {
  id: CardId;
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
  initiallyFaceUp: boolean;
  moveable: boolean;
}

export interface Pile {
  id: PileId;
  type: PileType;
  cards: CardId[];
}

export interface GameState {
  generated: boolean;
  cards: Record<CardId, Card>;
  piles: Record<PileId, Pile>;
  tableaus: PileId[];
  foundations: PileId[];
  stock: CardId;
  waste: CardId;
  flipCount: 1 | 3;
}
