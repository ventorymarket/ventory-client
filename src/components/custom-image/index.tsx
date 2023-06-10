import { getFullImageSrc, getVideoType, isVideo } from "@/utils";
import {
  LazyLoadImage,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CustomImage = ({
  src,
  className = "",
  alt = "Ventory - NFT Marketplace",
  wrapperClassName,
  ...props
}: LazyLoadImageProps) => {
  const fullSrc = getFullImageSrc(src as string);
  if (isVideo(fullSrc as string)) {
    return (
      <video
        width="100%"
        height="100%"
        className={className}
        muted
        autoPlay={true}
        controls={false}
        loop
      >
        <source src={src} type={getVideoType(fullSrc as string)} />
      </video>
    );
  }
  return (
    <LazyLoadImage
      src={fullSrc}
      alt="Image Alt"
      effect="blur"
      className={className}
      loading="lazy"
      wrapperClassName={wrapperClassName}
      placeholderSrc="/images/placeholder_nft.png"
      {...props}
    />
  );
};

export default CustomImage;
