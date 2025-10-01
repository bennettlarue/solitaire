"use client";

import StockPile from "@/components/StockPile";
import Tableau from "@/components/Tableau";
import WastePile from "@/components/WastePile";
import Image from "next/image";
import { GameContext } from "../contexts/GameContext";
import React from "react";

const Page = () => {
  const { state } = React.useContext(GameContext)!;

  return (
    <div className="flex p-10 gap-10">
      {/* test area */}
      <StockPile />
      <WastePile />
      <Tableau pileId={state.tableaus[0]} />
      <Tableau pileId={state.tableaus[1]} />
    </div>
  );
};

export default Page;
