import { GRID_MODE } from "@/constants";
import { Skeleton } from "antd";
import React from "react";

const ProductSkeleton = ({ gridMode }: { gridMode?: GRID_MODE }) => {
  return (
    <div className="w-full bg-layer-2 rounded-lg p-2">
      <Skeleton.Button
        shape="square"
        active
        className="aspect-square w-full rounded-lg skeleton-image"
        block
      />
      <div className="mt-2 space-y-2">
        {gridMode === GRID_MODE.LARGE && (
          <div className="w-4/6">
            <Skeleton.Button size="small" active block />
          </div>
        )}

        <div className="w-full">
          <Skeleton.Button size="small" active block />
        </div>
        <div className="w-4/6">
          <Skeleton.Button size="small" active block />
        </div>
        {gridMode === GRID_MODE.LARGE && (
          <div className="w-full">
            <Skeleton.Button active block size="small" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSkeleton;
