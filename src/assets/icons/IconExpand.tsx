import * as React from "react";
import { SVGProps } from "react";
const IconExpand = ({
  fill = "#94A7C6",
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.92 15.0496L13.4 8.52965C12.63 7.75965 11.37 7.75965 10.6 8.52965L4.07996 15.0496"
      stroke="#BABAC7"
      strokeWidth={2.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default IconExpand;
