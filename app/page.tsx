import StockPile from "@/components/StockPile";
import Tableau from "@/components/Tableau";
import WastePile from "@/components/WastePile";
import Image from "next/image";

const Page = () => {
  return (
    <div className="">
      {/* test area */}
      <StockPile />
      <WastePile />
      <Tableau />
    </div>
  );
};

export default Page;
