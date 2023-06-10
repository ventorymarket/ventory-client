import { MAX_LENGTH_CHARACTER } from "@/constants";
import React, { useEffect, useState } from "react";

const ReadMore = ({
  children,
  className,
}: {
  children: string;
  className: string;
}) => {
  const [isReadMoreShown, setIsReadMoreShown] = useState(false);

  useEffect(() => {
    if (children?.length > MAX_LENGTH_CHARACTER) setIsReadMoreShown(true);
  }, [children]);

  const toggle = () => {
    setIsReadMoreShown(!isReadMoreShown);
  };

  return (
    <div className={className}>
      {isReadMoreShown ? (
        <>
          {children?.substr(0, MAX_LENGTH_CHARACTER)}...
          <span className="cursor-pointer text-primary" onClick={toggle}>
            Show more
          </span>
        </>
      ) : (
        <>
          {children}
          <span className="cursor-pointer text-primary" onClick={toggle}>
            {children?.length > MAX_LENGTH_CHARACTER && "Show less"}
          </span>
        </>
      )}
    </div>
  );
};

export default ReadMore;
