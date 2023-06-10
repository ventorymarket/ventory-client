import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../../../public/images/logo/logo_footer.png";
import IconDiscord from "@/assets/icons/IconDiscord";
import IconMedium from "@/assets/icons/IconMedium";
import IconTelegram from "@/assets/icons/IconTeleram";
import IconTwitter from "@/assets/icons/IconTwitter";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className="bg-black w-full">
      <div className="layout py-[4rem]">
        <div className="xl:gap-[0] 2md:gap-[5rem] gap-[4rem] flex-col 2md:flex-row 2md:items-center flex !justify-start lg:justify-evenly flex-nowrap space-y-6 md:space-y-0">
          <div className="order-2 2md:order-1 flex-1 flex xl:gap-[7rem] mini:gap-[4rem] gap-[2rem]">
            <div className="!ml-0">
              <h6 className="font-bold text-lg text-white mb-2">Products</h6>
              <ul className="flex flex-col items-start space-y-2">
                <li>
                  {/* <Link
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  > */}
                    <div className="hover:text-white text-grey cursor-pointer">
                      DeFi
                    </div>
                  {/* </Link> */}
                </li>
                <li>
                  {/* <Link
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  > */}
                    <div className="hover:text-white text-grey cursor-pointer">
                      GameFi
                    </div>
                  {/* </Link> */}
                </li>
                <li>
                  {/* <Link
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  > */}
                    <div className="hover:text-white text-grey cursor-pointer">
                      Marketplace
                    </div>
                  {/* </Link> */}
                </li>
                <li>
                  {/* <Link
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  > */}
                    <div className="hover:text-white text-grey cursor-pointer">
                      Launchpad
                    </div>
                  {/* </Link> */}
                </li>
              </ul>
            </div>
            <div className="2md:w-[9rem]">
              <h6 className="font-bold text-lg text-white mb-2">Support</h6>
              <ul className="flex flex-col items-start space-y-2">
                <li>
                  {/* <Link
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  > */}
                    <div className="hover:text-white text-grey cursor-pointer">
                      Contact us
                    </div>
                  {/* </Link> */}
                </li>
                <li>
                  {/* <Link
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  > */}
                    <div className="hover:text-white text-grey cursor-pointer">
                      Terms & Condition
                    </div>
                  {/* </Link> */}
                </li>
                <li>
                  {/* <Link
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  > */}
                    <div className="hover:text-white text-grey cursor-pointer">
                      Privacy
                    </div>
                  {/* </Link> */}
                </li>
              </ul>
            </div>
            <div className="">
              <h6 className="font-bold text-lg text-white mb-2">About</h6>
              <ul className="flex flex-col items-start space-y-2">
                <li>
                  <div className="hover:text-white text-grey cursor-pointer">
                    Document
                  </div>
                  {/* </Link> */}
                </li>
                <li>
                  {/* <Link
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  > */}
                    <div className="hover:text-white text-grey cursor-pointer">
                      Help
                    </div>
                  {/* </Link> */}
                </li>
                <li>
                  {/* <Link
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  > */}
                    <div className="hover:text-white text-grey cursor-pointer">
                      FQAs
                    </div>
                  {/* </Link> */}
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col 2md:items-end space-y-6 order-1 2md:order-2">
            <div className="logo">
              <Image
                id="logo_footer"
                className="logo-dark"
                src={Logo}
                alt="Gamehub"
              />
            </div>
            <p className="lead-6 text-grey max-w-[28rem] 2md:text-right">
              Ventory community brings only the best and brightest projects to
              the Venom ecosystem.
            </p>
            <ul className="mb-[15px] flex items-center space-x-4">
              <li>
                <Link
                  href="https://twitter.com/Ventory_gg"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconTwitter width={24} height={24} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.com/invite/fskwRB7mDt"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconDiscord width={24} height={24} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://linktr.ee/ventory"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconMedium width={24} height={24} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://t.me/ventorychannel"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconTelegram width={24} height={24} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {isVisible && <Link onClick={scrollToTop} href="#"></Link>}
    </footer>
  );
}

export default Footer;
