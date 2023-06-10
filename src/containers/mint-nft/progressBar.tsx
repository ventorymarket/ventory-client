// import { useProviderSigner } from "contexts";
import { useEffect, useRef, useState } from "react";
import { isDateGreater } from "@/utils";
import { NumericFormat } from "react-number-format";
import { useVenom } from "@/contexts/useVenom";
import NFTAbiDevnet from "../../contexts/abi/CollectionSimilar.abi.json";

const Bar = (data: any) => {
  const { provider, isInitializing } = useVenom();

  const [nftDataPool, setNFTDataPool] = useState<any>(0);
  const attributes = data?.data;
  const max = Number(attributes?.itemCount);
  const bar = useRef<any>(0);
  const calcPercent = (current: any, max: any) => {
    try {
      if (current < 0 || max <= 0) return "";
      const percent = max < 100000 ? ((current * 100) / max).toFixed(2) : 100;
      bar.current.style.width = `${percent}%`;
      return `${percent}%`;
    } catch (ex) {}
    return "";
  };
  const getDataOnchain = async () => {
    try {
      if (attributes?.SC_collection) {
        const contract = new provider.Contract(
          NFTAbiDevnet,
          attributes?.SC_collection
        );
        const { count: id } = await contract.methods
          .totalSupply({ answerId: 0 })
          .call();
        setNFTDataPool(id);
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  const current = nftDataPool || 0;
  
  useEffect(() => {
    !isInitializing && getDataOnchain();
  }, [attributes?.SC_collection, isInitializing]);
  return (
    <div className="p-2">
      {/* {isDateGreater(new Date(), new Date(data?.data?.depositStartTime)) && <div className="mt-4"> */}
      <div className="text-sm flex justify-between text-secondary">
        <span className="">Minted Item</span>
        <div className="flex">
          <div>{calcPercent(current, max)}</div>
          <div>
            {`(`}
            <NumericFormat
              value={current}
              displayType="text"
              thousandSeparator=","
            />
            /
            {max >= 100000 ? (
              "∞"
            ) : (
              <NumericFormat
                value={max}
                displayType="text"
                thousandSeparator=","
              />
            )}
            {`)`}
          </div>
        </div>
      </div>
      <div className="mt-2 text-sm flex justify-between mb-2">
        <div className="w-full h-2 bg-jacarta-200 rounded-full">
          <div
            ref={bar}
            className=" h-full bg-primary rounded-full max-w-full"
          ></div>
        </div>
      </div>
      {/* </div>} */}
    </div>
  );
};
export default Bar;
