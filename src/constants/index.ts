export enum GRID_MODE {
  SMALL = "small",
  LARGE = "large",
}

export const SORT_OPTIONS = [
  {
    value: 1,
    label: "Price low to high",
  },
  {
    value: 0,
    label: "Price high to low",
  },
  {
    value: 5,
    label: "Recently listed",
  },
];

export const BULK_ACTION = [
  {
    value: "bulkList",
    label: "Bulk Listing",
  },
  {
    value: "bulkTransfer",
    label: "Bulk Transfer",
  },
  {
    value: "bulkHide",
    label: "Bulk Hide",
  },
];

export const STATUS_OPTIONS = [
  {
    name: "All",
    value: "buy-now,not-for-sale",
  },
  {
    name: "Buy now",
    value: "buy-now",
  },
  {
    name: "Not for sale",
    value: "not-for-sale",
  },
];

export const DURATION_OPTIONS = [
  {
    value: 1,
    label: "1 month",
  },
  {
    value: 2,
    label: "1 day",
  },
  {
    value: 3,
    label: "1 week",
  },
];

export const MAX_LENGTH_CHARACTER = 200;
export const DEFAULT_LIMIT = 30;

export enum NFT_STATUS {
  MINTED = -1,
  LISTING = 0,
  CANCEL = 1,
  SOLD_OUT = 2,
  NOT_FOR_SALE = 3,
}

export const ACTIVITY_STATUS_FILTER = [
  {
    label: "Listing",
    value: 0,
  },
  {
    label: "Sale",
    value: 6,
  },
  {
    label: "Transfer",
    value: 7,
  },
  {
    label: "Mint",
    value: 8,
  },
  {
    label: "Offer",
    value: 3,
  },
  {
    label: "Collection Offer",
    value: 5,
  },
];
export const ACTIVITY_STATUS = {
  LISTING: 0,
  CANCEL: 1,
  UPDATE: 2,
  OFFER: 3,
  CANCEL_OFFER: 4,
  ACCEPT_OFFER: 5,
  COMPLETE: 6,
  TRANSFER: 7,
  MINT: 8,
  COLLECTION_OFFER: 11,
  AUCTION_START: 12,
  AUCTION_BID: 13,
  AUCTION_SETTLE: 14,
};

export const REFUNDABLE_FEE = 3.33 * 10 ** 9;
