import { GameState, CardId, PileId, Card, Pile } from "@/app/types";

export function isValidTableauMove(
  state: GameState,
  card: Card,
  fromPile: Pile,
  toPile: Pile
): boolean {
  if (fromPile.id === toPile.id) return false;

  if (!card.faceUp) return false;

  // Only kings for empty piles.
  if (toPile.cards.length === 0) return card.rank === 13;

  const topCardId = toPile.cards[toPile.cards.length - 1];
  const topCard = state.cards[topCardId];

  if (!topCard.faceUp) return false;

  // Must be descending rank.
  if (card.rank !== topCard.rank - 1) return false;

  const cardIsRed = card.suit === "h" || card.suit === "d";
  const topIsRed = topCard.suit === "h" || topCard.suit === "d";

  return cardIsRed != topIsRed;
}

export function isValidFoundationMove(
  state: GameState,
  card: Card,
  fromPile: Pile,
  toPile: Pile
): boolean {
  console.log("Card move initiated");
  console.log("From Pile:", fromPile);
  console.log("To Pile:", toPile);

  if (fromPile.id === toPile.id) return false;

  if (!card.faceUp) return false;

  // Only aces for empty piles.
  if (toPile.cards.length === 0) return card.rank === 1;

  const topCardId = toPile.cards[toPile.cards.length - 1];
  const topCard = state.cards[topCardId];

  if (!topCard.faceUp) return false;

  // Must be ascending rank.
  if (card.rank !== topCard.rank + 1) return false;

  return card.suit === topCard.suit;

  //const cardIsRed = card.suit === "h" || card.suit === "d";
  //const topIsRed = topCard.suit === "h" || topCard.suit === "d";

  //return cardIsRed != topIsRed;
}

export function isValidMove(
  state: GameState,
  cardId: CardId,
  fromPileId: PileId,
  toPileId: PileId
): boolean {
  const card = state.cards[cardId];
  const fromPile = state.piles[fromPileId];
  const toPile = state.piles[toPileId];

  console.log("Card move initiated");
  console.log("From Pile:", fromPile);
  console.log("To Pile:", toPile);

  switch (toPile.type) {
    case "tableau":
      return isValidTableauMove(state, card, fromPile, toPile);
    case "foundation":
      return isValidFoundationMove(state, card, fromPile, toPile);
    default:
      return false;
  }
}
