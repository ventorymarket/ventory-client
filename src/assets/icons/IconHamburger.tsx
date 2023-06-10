import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <path fill="#94A7C6" d="M12.5 19.996h15-15Zm0-3.75h15-15Zm0 7.5h15-15Z" />
    <path
      stroke="#94A7C6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.5 23.746h15m-15-3.75h15-15Zm0-3.75h15-15Z"
    />
  </svg>
);
export default SvgComponent;
