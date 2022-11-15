import { CONFIG } from "config/config";
import { ethers } from "ethers";

/**
 * This file has functions needed to generate collection wide offers.
 * There are two parts to creating a collection wide bid on arcade
 *
 *  1. Generate an ItemsHash that is sent as payload to POST /loanTerms
 *  2. Create signature over the expected payload that can be used by the borrower to initialize a loan
 *
 */

export interface SignatureItem {
  cType: 0 | 1 | 2;
  asset: string;
  tokenId: ethers.BigNumberish;
  amount: ethers.BigNumberish;
}

export interface ItemsPredicate {
  data: string;
  verifier: string;
}

export const encodeSignatureItems = (items: SignatureItem[]): string => {
  const types = ["(uint256,address,int256,uint256)[]"];
  const values = items.map((item) => [
    item.cType,
    item.asset,
    item.tokenId,
    item.amount,
  ]);

  return ethers.utils.defaultAbiCoder.encode(types, [values]);
};

export const encodePredicates = (predicates: ItemsPredicate[]): string => {
  const types = ["(bytes,address)[]"];
  const values = predicates.map((p) => [p.data, p.verifier]);

  const coded = ethers.utils.defaultAbiCoder.encode(types, [values]);
  return ethers.utils.keccak256(coded);
};

const signatureItems: SignatureItem[] = [
  {
    cType: 0, // 0 for 721
    asset: "COLLECTION-CONTRACT-ADDRESS",
    tokenId: "-1", // wildcard tokenId used for collection wide offers
    amount: 0, // not used for 721
  },
];

const predicates: ItemsPredicate[] = [
  {
    verifier: CONFIG.contract.itemsVerifier.v2.address,
    data: encodeSignatureItems(signatureItems),
  },
];

// itemsHash needed as part of payload to POST loanTerms
const itemsHash = encodePredicates(predicates);

interface ItemsPayload {
  durationSecs: BigNumberish;
  principal: BigNumber;
  interestRate: BigNumber;
  collateralAddress: string;
  itemsHash: string;
  payableCurrency: string;
  numInstallments: BigNumberish;
  nonce: BigNumberish;
  side: 0 | 1;
  deadline: BigNumberish;
}

const types = {
  LoanTermsWithItems: [
    { name: "durationSecs", type: "uint32" },
    { name: "deadline", type: "uint32" },
    { name: "numInstallments", type: "uint24" },
    { name: "interestRate", type: "uint160" },
    { name: "principal", type: "uint256" },
    { name: "collateralAddress", type: "address" },
    { name: "itemsHash", type: "bytes32" },
    { name: "payableCurrency", type: "address" },
    { name: "nonce", type: "uint160" },
    { name: "side", type: "uint8" },
  ],
};

const domain = {
  name: CONFIG.domainData.name,
  version: CONFIG.domainData.version,
  chainId: CONFIG.domainData.chainId,
  verifyingContract: CONFIG.contract.originationController.v2.address,
};

const signature = await signer._signTypedData(domain, types, message);
