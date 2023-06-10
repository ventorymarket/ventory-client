import { GRID_MODE } from "@/constants";
import ProductSkeleton from "./ProductSkeleton";

const SkeletonLoadingGrid = ({ gridMode }: { gridMode?: GRID_MODE }) => {
  const array = new Array(12).fill(1);
  return (
    <>
      {array.map((e, index) => (
        <ProductSkeleton gridMode={gridMode} key={index} />
      ))}
    </>
  );
};

export default SkeletonLoadingGrid;
