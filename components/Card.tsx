"use client";

import * as React from "react";
import { motion, PanInfo } from "motion/react";

export interface ICardProps {
  layoutId: string;
  suit: "c" | "d" | "h" | "s";
  rank: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  faceUp: boolean;
}

export default function Card(props: ICardProps) {
  const { layoutId, faceUp, suit, rank } = props;
  const imagePath = `/cards/${rank}${suit}.svg`;

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
      layoutId={layoutId}
      style={{ transformStyle: "preserve-3d", height: 68, width: 50 }}
      animate={{ rotateY: faceUp ? 0 : 180 }} // Fixed: 0 = face up, 180 = face down
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      whileDrag={{
        scale: 1.05,
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      }}
      dragMomentum={false}
      className="bg-white shadow w-fit h-fit mx-auto px-2 py-3 absolute" // Added relative
    >
      {/* Front face (card face) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
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
