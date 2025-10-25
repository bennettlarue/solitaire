"use client";

import * as React from "react";
import { motion, PanInfo } from "motion/react";
import { CardId, PileId, Rank, Suit } from "@/app/types";
import { GameContext } from "@/contexts/GameContext";
import { isValidMove } from "@/app/utils/validateMove";
import { useRef } from "react";

export interface ICardProps {
  cardId: CardId;
  sourcePileId: PileId;
  layoutId: string;
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
  initiallyFaceUp: boolean; // Determines if the card is initially rendered face up. Used for triggering (or preventing) flip animations during layout shifts.
  stackIndex: number;
  cardsIdsInStack?: CardId[];
  yOffset?: number;
  scale?: number;
  children?: React.ReactNode;
}

export default function Card(props: ICardProps) {
  const {
    cardId,
    sourcePileId,
    layoutId,
    faceUp,
    suit,
    rank,
    cardsIdsInStack,
    yOffset,
    scale,
    children,
  } = props;
  const imagePath = `/cards/${rank}${suit}.svg`;
  const { state, dispatch } = React.useContext(GameContext)!;

  // Track what face to display (may differ from faceUp during flip animation)
  const [displayFaceUp, setDisplayFaceUp] = React.useState(faceUp);
  const [isFlipping, setIsFlipping] = React.useState(false);
  const prevFaceUpRef = useRef(faceUp);

  React.useEffect(() => {
    // Only animate flip if faceUp changed (not initial render)
    if (prevFaceUpRef.current !== faceUp) {
      setIsFlipping(true);
      // Swap the displayed image halfway through the flip (when scaleX = 0)
      setTimeout(() => {
        setDisplayFaceUp(faceUp);
      }, 150); // Half of the 300ms flip duration
    }
    prevFaceUpRef.current = faceUp;
  }, [faceUp]);

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
              cardIds: cardsIdsInStack || [cardId],
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
      layout
      initial={{
        y: yOffset || 0,
        scale: scale || 1,
      }}
      style={{
        height: 68 * 1.2,
        width: 50 * 1.2,
        zIndex: 10,
        position: "absolute",
      }}
      animate={{
        y: yOffset || 0,
        scale: scale || 1,
        scaleX: isFlipping ? [1, 0, 1] : 1,
      }}
      onAnimationComplete={() => {
        if (isFlipping) {
          setIsFlipping(false);
        }
      }}
      transition={{
        // Layout animation (position) - quick and smooth
        layout: { duration: 0.3, ease: "easeInOut" },
        // Flip animation
        scaleX: { duration: 0.3, ease: "easeInOut" },
        // Other animations
        default: {
          duration: 0.2,
          ease: "easeInOut",
        },
      }}
      className="bg-white shadow-sm w-fit h-fit mx-auto absolute rounded-sm"
    >
      {/* Conditionally render front or back based on displayFaceUp (visual state during flip) */}
      <div className="absolute w-full h-full flex items-center justify-center">
        {displayFaceUp ? (
          // Card face
          <img
            src={imagePath}
            alt={altText}
            className="pointer-events-none p-1"
            style={{
              height: 68,
              width: 50,
            }}
          />
        ) : (
          // Card back
          <img
            src={"/cards/joker.svg"}
            alt="Card back"
            className="pointer-events-none"
            style={{
              height: 68,
              width: 50,
            }}
          />
        )}
      </div>
      {children}
    </motion.div>
  );
}
