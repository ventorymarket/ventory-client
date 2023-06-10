import React from "react";
import NoDataImg from "../../../public/images/no-data.png";
import Image from "next/image";

const NoData = ({ description }: any) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center text-[18px] font-semibold h-full w-full justify-center">
        <Image src={NoDataImg} alt="no data" />
        <p className="text-white">{description}</p>
      </div>
    </div>
  );
};

export default NoData;
