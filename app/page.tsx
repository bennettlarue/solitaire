"use client";

import StockPile from "@/components/StockPile";
import Tableau from "@/components/Tableau";
import WastePile from "@/components/WastePile";
import Image from "next/image";
import { dealCards, GameContext } from "../contexts/GameContext";
import React from "react";
import Foundation from "@/components/Foundation";

const Page = () => {
  const { state, dispatch } = React.useContext(GameContext)!;

  return (
    <div className="p-10 gap-5 flex flex-col">
      <button
        onClick={() => {
          dealCards(state, dispatch);
        }}
      >
        deal
      </button>
      <div className="flex gap-2">
        <StockPile />
        <WastePile />
        {state.foundations.map((foundation, index) => {
          return (
            <Foundation
              key={state.foundations[index]}
              pileId={state.foundations[index]}
            />
          );
        })}
      </div>
      <div className="flex gap-2">
        {state.tableaus.map((tableau, index) => {
          return (
            <Tableau
              key={state.tableaus[index]}
              pileId={state.tableaus[index]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
