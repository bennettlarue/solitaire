"use client";

import * as React from "react";
import { motion, PanInfo } from "motion/react";
import { CardId, PileId, Rank, Suit } from "@/app/types";
import { GameContext } from "@/contexts/GameContext";
import { isValidMove } from "@/app/utils/validateMove";

export interface ICardProps {
  cardId: CardId;
  sourcePileId: PileId;
  layoutId: string;
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
  initiallyFaceUp: boolean; // Determines if the card is initially rendered face up. Used for triggering (or preventing) flip animations during layout shifts.
  stackIndex?: number;
  yOffset?: number;
}

export default function Card(props: ICardProps) {
  const {
    cardId,
    sourcePileId,
    layoutId,
    faceUp,
    initiallyFaceUp,
    suit,
    rank,
    yOffset,
  } = props;
  const imagePath = `/cards/${rank}${suit}.svg`;
  const { state, dispatch } = React.useContext(GameContext)!;

  const getSuitName = (suit: string) => {
    switch (suit) {
      case "c":
        return "Clubs";
      case "d":
        return "Diamonds";
      case "h":
        return "Hearts";
      case "s":
        return "Spades";
      default:
        return "";
    }
  };

  const getRankName = (rank: number) => {
    switch (rank) {
      case 1:
        return "Ace";
      case 11:
        return "Jack";
      case 12:
        return "Queen";
      case 13:
        return "King";
      default:
        return rank.toString();
    }
  };

  const altText = `${getRankName(rank)} of ${getSuitName(suit)}`;

  return (
    <motion.div
      drag
      dragConstraints={{
        left: 0,
        right: 0,
        top: yOffset || 0,
        bottom: yOffset || 0,
      }}
      dragElastic={1}
      onDragEnd={(event, info) => {
        const clientX = (event as MouseEvent).clientX;
        const clientY = (event as MouseEvent).clientY;

        const elements = document.elementsFromPoint(clientX, clientY)!;
        const pileElement = elements.find((el) =>
          el.hasAttribute("data-pile-id")
        );

        if (pileElement) {
          const targetPileId = pileElement.getAttribute("data-pile-id")!;

          if (isValidMove(state, cardId, sourcePileId, targetPileId))
            dispatch({
              type: "MOVE_CARDS",
              fromPile: sourcePileId,
              toPile: targetPileId,
              cardIds: [cardId],
            });
        }
      }}
      whileDrag={{
        scale: 1.05,
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        zIndex: 200000,
      }}
      dragMomentum={false}
      layoutId={layoutId}
      initial={{ rotateY: initiallyFaceUp ? 180 : 0, y: yOffset || 0 }}
      style={{
        transformStyle: "preserve-3d",
        height: 68 * 1.2,
        width: 50 * 1.2,
        zIndex: 10,
      }}
      animate={{ rotateY: faceUp ? 0 : 180, y: yOffset || 0 }} // Fixed: 0 = face up, 180 = face down
      transition={{
        // Layout animation (position) - quick and smooth
        layout: { duration: 0.3, ease: "easeInOut" },
        // Rotation animation - only animate when faceUp actually changes
        rotateY: {
          duration: 0.1,
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.3,
        },
      }}
      className="bg-white shadow w-fit h-fit mx-auto absolute" // Added relative
    >
      {/* Front face (card face) */}
      <div
        className="absolute inset-0 flex items-center justify-center p-1"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <img
          src={imagePath}
          alt={altText}
          className="pointer-events-none"
          style={{
            height: 68,
            width: 50,
          }}
        />
      </div>

      {/* Back face (card back) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <img
          src={"/cards/joker.svg"}
          alt="Card back"
          className="pointer-events-none"
          style={{
            height: 68,
            width: 50,
          }}
        />
      </div>
    </motion.div>
  );
}
