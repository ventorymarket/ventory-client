import Image from "next/image";
import React, { FC } from "react";
import IconVerified from "@/assets/icons/IconVerified";
import Link from "next/link";
import VenomToken from "../../../public/images/token/venom.png";
import CustomImage from "../custom-image";
import moment from "moment";

interface IGameCardProps {
  image?: any;
  title?: string;
  id?: string;
  time?: any;
  price?: any;
}

const ItemLaunchpad: FC<IGameCardProps> = ({
  image,
  title,
  id,
  time,
  price,
}: IGameCardProps) => {
  return (
    <Link href={`/ino/${id}`}>
      <div className="flex flex-col rounded-lg bg-layer-2 max-w-full cursor-pointer group p-2 border border-solid border-stroke">
        <div className=" overflow-hidden rounded-tl-lg rounded-tr-lg">
          <CustomImage
            src={image}
            alt="game"
            className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg group-hover:scale-110 !transition !ease-in-out !duration-200"
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <div className="flex flex-col w-full">
            <div className="flex justify-start items-center space-x-1 mb-2">
              <IconVerified />
              <span className="text-sm text-white font-medium three_dot_1_line">
                {title}
              </span>
            </div>
            <div className=" bg-layer-3 text-xs font-medium text-secondary rounded-lg text-center py-2 px-3">
              <div className="flex justify-between">
                <div>Launching</div>
                <div className="text-white">
                  {`${moment.unix(time / 1000).format("DD/MM HH:mm")} UTC`}
                </div>
              </div>
              <div className="flex justify-between mt-1">
                <div>Price</div>
                <div className="flex justify-center gap-1 text-white">
                  <Image src={VenomToken} alt="Venom" className="w-4 h-4" />
                  <div>{`${price || 0}`} VENOM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemLaunchpad;
