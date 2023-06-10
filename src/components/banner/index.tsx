import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { isDateGreater } from "@/utils";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Scrollbar } from "swiper";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Items_Countdown_timer from "../items_countdown_timer";
import IconVerified from "@/assets/icons/IconVerified";
import IconArrow from "@/assets/icons/IconArrow";
import { NumericFormat } from "react-number-format";
import { toast } from "react-hot-toast";
import { getLogoURL } from "@/helper/url";
import CustomImage from "../custom-image";
import { useEffect, useState } from "react";
import { getBanner } from "@/service/homepage";

function Banner() {
  const [dataBanner, setDataBanner] = useState([]);
  const getDataBanner = async () => {
    try {
      const allData = await getBanner([]);
      const all = allData?.data || [];
      setDataBanner(all);
    } catch (ex) {
      console.log(ex);
    }
  };
  const getLogo = (item: any) => {
    try {
      const data = item?.attributes?.banner?.data;
      if (data && data?.attributes?.url)
        return getLogoURL(data?.attributes?.url);
    } catch (ex: any) {
      toast.error(ex);
    }
    return null;
  };
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
 
  useEffect(() => {
    getDataBanner();
  }, []);
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        loop={true}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: true,
        // }}
        autoplay={false}
        navigation={{
          nextEl: ".launchpad-swiper-next",
          prevEl: ".launchpad-swiper-prev",
        }}
      >
        {dataBanner &&
          dataBanner
            .sort(
              (a: any, b: any) =>
                Number(getStartTime(a)) - Number(getStartTime(b))
            )
            .map((item: any, index: any) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    className="sm:px-8 sm:py-7 rounded-lg p-2"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 192, 137, 0.62) 0%, rgba(0, 192, 137, 0) 100%)",
                    }}
                  >
                    <div className="w-full relative text-dark">
                      <Link href={`/ino/${item?.attributes?.code}`}>
                        <CustomImage
                          src={getLogo(item)}
                          alt={"title"}
                          className="rounded-lg cursor-pointer !object-cover w-full md:aspect-[4/1] h-[308px] sm:h-[420px] md:min-h-[350px]"
                        />
                      </Link>
                      <div className="absolute w-full flex justify-center items-end bottom-6 ">
                        <div className="stat lg:w-[70%] rounded-lg p-3 w-[95%] xl:w-[60%] bg-[#FFFFFF99]">
                          <div className="flex justify-between items-center gap-0 sm:gap-4 flex-col sm:flex-row">
                            <CustomImage
                              src={getLogoURL(
                                item?.attributes?.logo?.data?.attributes?.url
                              )}
                              alt={"title"}
                              className="hidden sm:block rounded-lg cursor-pointer !object-cover aspect-square border-2 h-[131px] w-[131px] border-white border-solid max-w-none ml-1"
                            />
                            <div className="m-1 flex flex-col gap-2 sm:block">
                              <div className="flex gap-2 sm:gap-0">
                                <CustomImage
                                  src={getLogoURL(
                                    item?.attributes?.logo?.data?.attributes
                                      ?.url
                                  )}
                                  alt={"title"}
                                  className="sm:hidden rounded-lg cursor-pointer !object-cover aspect-square border-2 h-[73px] w-[73px] border-white border-solid max-w-none"
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <IconVerified />
                                    <div className="font-semibold three_dot_1_line">
                                      {item?.attributes?.name}
                                    </div>
                                  </div>
                                  <div className="font-normal text-[13px] three_dot_2_line">
                                    {item?.attributes?.description}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 mb-0 sm:mb-5 lg:mb-0 flex-row">
                                <div className="p-2 px-3 bg-white rounded-lg min-w-[157px] flex justify-between gap-2 mt-1 basis-1/2 sm:basis-auto">
                                  <div className="flex flex-col gap-1">
                                    <div className="font-normal text-xs">
                                      Items
                                    </div>
                                    <div className="text-sm font-semibold">
                                      <NumericFormat
                                        value={
                                          item?.attributes?.itemCount < 100000
                                            ? parseInt(
                                                item?.attributes?.itemCount || 0
                                              ).toLocaleString(undefined)
                                            : "∞"
                                        }
                                        displayType="text"
                                        thousandSeparator=","
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div className="font-normal text-xs">
                                      Starting
                                    </div>
                                   
                                  </div>
                                </div>
                                {isDateGreater(
                                  getStartTime(item),
                                  new Date().getTime()
                                ) && (
                                  <div className="bg-white rounded-lg lg:flex flex-col mt-1 w-[150px] p-2 px-3 gap-1 text-[14px] font-semibold basis-1/2 sm:basis-auto">
                                    <span className="font-display font-normal text-xs">
                                      Starts In:
                                    </span>
                                    <Items_Countdown_timer
                                      className="!justify-between"
                                      time={
                                        Number(getStartTime(item)) -
                                        new Date().getTime()
                                      }
                                    />
                                  </div>
                                )}
                                {isDateGreater(
                                  getEndTime(item),
                                  new Date().getTime()
                                ) &&
                                  !isDateGreater(
                                    getStartTime(item),
                                    new Date().getTime()
                                  ) && (
                                    <div className="bg-white rounded-lg flex justify-center items-center mt-1 max-sw-[150px] p-2 px-3 gap-1 text-[14px] font-semibold basis-1/2 sm:basis-auto">
                                      <div className="h-2 w-2 bg-primary rounded-full mr-1"></div>
                                      Minting Now
                                    </div>
                                  )}
                                {!isDateGreater(
                                  getEndTime(item),
                                  new Date().getTime()
                                ) && (
                                  <div className="bg-white rounded-lg flex justify-center items-center mt-1 max-sw-[150px] p-2 px-3 gap-1 text-[14px] font-semibold basis-1/2 sm:basis-auto">
                                    SALE ENDED
                                  </div>
                                )}
                              </div>
                              <Link
                                href={`/ino/${item?.attributes?.code}`}
                                className="absolute top-5 right-5 sm:top-auto sm:bottom-3 sm:right-4 text-primary text-[14px] gap-2 flex items-center font-semibold"
                              >
                                <div className="hidden sm:block">
                                  {"View more"}
                                </div>
                                <IconArrow />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
      </Swiper>
      {/* <div className="launchpad-swiper-prev absolute !top-1/2 !z-10 -mt-6 -left-1 hidden lg:block">
        <MdChevronLeft className="text-[3rem]" />
      </div>
      <div className="launchpad-swiper-next absolute !top-1/2 !z-10 -mt-6 -right-1 hidden lg:block">
        <MdChevronRight className="text-[3rem]" />
      </div> */}
    </div>
  );
}
export default Banner;
