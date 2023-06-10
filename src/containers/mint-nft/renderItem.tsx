import NoData from "@/components/NoData";
import ItemMintNFT from "@/components/mint-nft-card";
import { useState } from "react";
import { useContexts } from "./context";
import cx from "classnames";

const ListItem = () => {
  const [activeID, setActiveID] = useState(1);
  const { upcoming, active, completed }: any = useContexts();
  const menu = [
    {
      id: 1,
      text: (
        <div className="flex items-center justify-center">
          <div>All</div>
          <div
            className={cx(
              "w-4 h-4 text-[10px] flex items-center justify-center rounded-sm ml-1",
              {
                "bg-layer-focus text-white": activeID != 1,
                "bg-white text-black": activeID == 1,
              }
            )}
          >
            {active?.length + upcoming?.length + completed?.length}
          </div>
        </div>
      ),
    },
    {
      id: 2,
      text: (
        <div className="flex items-center justify-center">
          <div>Active</div>
          <div
            className={cx(
              "w-4 h-4 text-[10px] flex items-center justify-center rounded-sm ml-1",
              {
                "bg-layer-focus text-white": activeID != 2,
                "bg-white text-black": activeID == 2,
              }
            )}
          >
            {active.length}
          </div>
        </div>
      ),
    },
    {
      id: 3,
      text: (
        <div className="flex items-center justify-center">
          <div>Upcoming</div>
          <div
            className={cx(
              "w-4 h-4 text-[10px] flex items-center justify-center rounded-sm ml-1",
              {
                "bg-layer-focus text-white": activeID != 3,
                "bg-white text-black": activeID == 3,
              }
            )}
          >
            {upcoming.length}
          </div>
        </div>
      ),
    },

    {
      id: 4,
      text: (
        <div className="flex items-center justify-center">
          <div>Completed</div>
          <div
            className={cx(
              "w-4 h-4 text-[10px] flex items-center justify-center rounded-sm ml-1",
              {
                "bg-layer-focus text-white": activeID != 4,
                "bg-white text-black": activeID == 4,
              }
            )}
          >
            {completed.length}
          </div>
        </div>
      ),
    },
  ];
  const renderMenu = () => {
    return menu.map((item) => (
      <li key={item.id} onClick={() => setActiveID(item.id)}>
        <div
          className={
            item.id != activeID
              ? "hover:bg-layer-1 text-[#BABAC7] flex items-center !rounded-lg p-1.5 font-normal text-base cursor-pointer sm:px-[20px] sm:py-[12px]"
              : "bg-layer-1 flex p-1.5 items-center !rounded-lg text-white font-normal text-base cursor-pointer sm:px-[20px] sm:py-[12px]"
          }
        >
          <span>{item.text}</span>
        </div>
      </li>
    ));
  };
  const renderItem = (data: any) => {
    try {
      if (!data || data?.length === 0) return <NoData />;
      let ui = data.map((item: any, index: any) => {
        return <ItemMintNFT data={item} key={index} />;
      });
      return ui;
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div>
      <div className="flex mt-2">
        <ul className="flex items-center p-1 justify-evenly rounded-xl bg-[#131924] sm:gap-1">
          {renderMenu()}
        </ul>
      </div>

      {(activeID == 1 || activeID == 2) && active && active.length > 0 && (
        <div className="mt-10">
          <div className="text-[24px] mb-4 text-white">Mint now</div>
          <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-2 lg:grid-cols-4">
            {renderItem(active)}
          </div>
        </div>
      )}

      {(activeID == 1 || activeID == 3) && upcoming && upcoming.length > 0 && (
        <div className="mt-10">
          <div className="text-[24px] mb-4 text-white">Upcoming</div>
          <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-2 lg:grid-cols-4">
            {renderItem(upcoming)}
          </div>
        </div>
      )}

      {(activeID == 1 || activeID == 4) &&
        completed &&
        completed.length > 0 && (
          <div className="mt-10">
            <div className="text-[24px] mb-4 text-white">Completed</div>
            <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-2 lg:grid-cols-4">
              {renderItem(completed)}
            </div>
          </div>
        )}
    </div>
  );
};
export default ListItem;
