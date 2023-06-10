import IconVerified from "@/assets/icons/IconVerified";
import Link from "next/link";
import VenomToken from "../../../public/images/token/venom.png";
import Image from "next/image";
import Items_Countdown_timer from "../items_countdown_timer";
import Bar from "@/containers/mint-nft/progressBar";
import { NumericFormat } from "react-number-format";
import CustomImage from "../custom-image";

interface IMintNFTCardProps {
  data: any;
}

const ItemMintNFT = ({ data }: IMintNFTCardProps) => {
  const getUnixTime = (idx: any) => {
    return new Date(idx).getTime();
  };
  const getStartTime = (idx: any) => {
    try {
      const arr = [
        getUnixTime(idx?.attributes?.publicStartTime),
        getUnixTime(idx?.attributes?.keyHolderStartTime),
        getUnixTime(idx?.attributes?.whitelistStartTime),
        getUnixTime(idx?.attributes?.privateStartTime),
      ];
      const arrSort = arr.filter((x) => x != 0).sort();
      return arrSort[0];
    } catch (ex) {
      console.log(ex);
    }
  };
  const getEndTime = (idx: any) => {
    try {
      const arr = [
        getUnixTime(idx?.attributes?.publicEndTime),
        getUnixTime(idx?.attributes?.keyHolderEndTime),
        getUnixTime(idx?.attributes?.whitelistEndTime),
        getUnixTime(idx?.attributes?.privateEndTime),
      ];
      const arrSort = arr
        .filter((x) => x != 0)
        .sort()
        .reverse();
      return arrSort[0];
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <Link href={`/ino/${data?.attributes?.code}`}>
      <div className="bg-layer-2 border border-solid rounded-lg p-2 border-stroke cursor-pointer group">
        <div className="flex flex-col space-y-2">
          <div className="aspect-square w-full overflow-hidden relative">
            <CustomImage
              src={data?.attributes?.logo?.data?.attributes?.url}
              alt="Nft"
              className="object-cover rounded-lg w-full h-full group-hover:scale-110 !transition !duration-300 !ease-in-out"
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <div className="flex flex-col w-full">
              <div className="flex justify-start items-center space-x-1 mb-2">
                <IconVerified />
                <span className="text-base text-white three_dot_1_line">
                  {data?.attributes?.name}
                </span>
              </div>
              <div className=" bg-layer-3 text-xs font-medium text-secondary rounded-lg text-center py-2 px-3">
                <div className="flex justify-between">
                  <div>Price:</div>
                  <div className="flex justify-center gap-1">
                    <Image src={VenomToken} alt="Venom" className="w-4 h-4" />
                    <div>{`${data?.attributes?.pricePublic} VENOM`}</div>
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <div>Items</div>
                  <div>
                    <NumericFormat
                      value={data?.attributes?.itemCount}
                      displayType="text"
                      thousandSeparator=","
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {data?.attributes?.collectionStatus == "Active" && (
            <div>
              <Bar data={data?.attributes}/>
              <div className="flex items-center justify-evenly py-1 text-white">
                <span className="text-[12px]">End In:</span>
                <div className="w-[65%] text-[14px]">
                  <Items_Countdown_timer
                    className="!w-[200px]"
                    time={Number(getEndTime(data)) - new Date().getTime()}
                  />
                </div>
              </div>
            </div>
          )}
          {data?.attributes?.collectionStatus == "Upcoming" && (
            <div className="flex items-center justify-evenly py-1 text-white">
              <span className="text-[12px]">Start In:</span>
              <div className="w-[65%]">
                <Items_Countdown_timer
                  className="!w-[200px]"
                  time={Number(getStartTime(data)) - new Date().getTime()}
                />
              </div>
            </div>
          )}
          {data?.attributes?.collectionStatus == "Completed" && (
            <div className="flex items-center justify-evenly py-2 text-white">
              <span className="text-[14px]">Event Ends</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ItemMintNFT;
