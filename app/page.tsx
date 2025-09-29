import StockPile from "@/components/StockPile";
import WastePile from "@/components/WastePile";
import Image from "next/image";

const Page = () => {
  return (
    <div className="">
      {/* test area */}
      <StockPile />
      <WastePile />
    </div>
  );
};

export default Page;
