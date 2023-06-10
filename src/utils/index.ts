export const formatWallet = (address: any) => {
  if (!address) return "";
  return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
};
export const formatBalance = (value: any) => {
  return (Number(value) / 10 ** 9).toString();
};
export const isDateGreater = (date1: any, date2: any) => {
  return date1 - date2 <= 0 ? false : true;
};

export const getFullImageSrc = (src: string) => {
  if (!src) return undefined;
  let fullSrc = src;
  if (src.startsWith("ipfs://")) {
    fullSrc = `https://ipfs.io/ipfs/${src.slice(7)}`;
  }
  return fullSrc;
};

export const isVideo = (url: string) => {
  return /\.(mp3|mp4|wav|ogg)$/.test(url);
};

export const getVideoType = (url: string) => {
  const types = ["mp4", "wav", "ogg"];
  let videoType = "";
  for (let type of types) {
    if (url.endsWith(type)) {
      videoType = `video/${type}`;
      break;
    }
  }
  return videoType;
};
