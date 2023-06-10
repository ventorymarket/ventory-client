import React, { ReactNode, useEffect, useRef } from "react";
import cx from "classnames";
import IconDoubleArrow from "@/assets/icons/IconDoubleArrow";
import ReactDOM from "react-dom";

interface ICustomDrawerProps {
  open?: boolean;
  onClose?: () => void;
  title: string | ReactNode;
  children?: any;
}

const CustomDrawer = ({
  open,
  onClose,
  title,
  children,
}: ICustomDrawerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = "fixed";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose && onClose();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return open
    ? ReactDOM.createPortal(
        <div
          className={cx(
            "w-screen h-screen fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm z-[999]",
            { hidden: !open, block: open }
          )}
        >
          <div className="w-full h-full p-5 flex justify-end">
            <div
              className="h-full w-full max-w-[387px] rounded-lg bg-layer-2 p-2 animate-slide-in-from-right flex flex-col"
              ref={ref}
            >
              <div className="flex items-center justify-between px-2 py-3 border-b border-solid border-stroke">
                {typeof title === "string" ? (
                  <h1 className="text-3xl font-semibold text-white">{title}</h1>
                ) : (
                  title
                )}
                <IconDoubleArrow className="cursor-pointer" onClick={onClose} />
              </div>
              <div className="px-2 py-3 flex-1 overflow-y-auto">{children}</div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default CustomDrawer;
