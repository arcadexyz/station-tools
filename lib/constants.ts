type Shape = {
  TWO_WEEKS: number;
  ZERO_ZERO: string;
  ONE_WEEK_SECONDS: number;
  ONE_DAY_SECONDS: number;
  THIRTY_DAYS_MS: number;
  EIGHTEEN: number;
  COLLATERAL_KIND: {
    ASSET: "ASSET";
    VAULT: "VAULT";
  };
  COLLATERAL_TYPE: {
    ERC721: "ERC721";
    ERC1155: "ERC1155";
    ERC20: "ERC20";
  };
  TERMS_BY_KIND: {
    ASSET: "asset";
    VAULT: "vault";
    LOAN: "loan";
    COLLECTION: "collection";
  };
  ROLE: {
    BORROWER: 0;
    LENDER: 1;
  };
  INTEGER: {
    ZERO: 0;
    ONE: 1;
  };
};

export const CONSTANTS: Shape = {
  ONE_WEEK_SECONDS: 7 * 24 * 60 * 60, // 604800
  ONE_DAY_SECONDS: 24 * 60 * 60, // 86400
  TWO_WEEKS: 14 * 24 * 60 * 60 * 1000,
  THIRTY_DAYS_MS: 86400 * 30 * 1000,
  ZERO_ZERO: "00", // protocol consider 0.01% as 1 * 10**18 so 1% = 100 * 10 ** 18
  EIGHTEEN: 18,
  COLLATERAL_KIND: {
    ASSET: "ASSET",
    VAULT: "VAULT",
  },
  COLLATERAL_TYPE: {
    ERC721: "ERC721",
    ERC1155: "ERC1155",
    ERC20: "ERC20",
  },
  TERMS_BY_KIND: {
    ASSET: "asset",
    VAULT: "vault",
    LOAN: "loan",
    COLLECTION: "collection",
  },
  ROLE: {
    BORROWER: 0,
    LENDER: 1,
  },
  INTEGER: {
    ZERO: 0,
    ONE: 1,
  },
};
