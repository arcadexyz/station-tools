import { CONFIG } from "config/config";
import { ethers, BigNumberish } from "ethers";
import { VoidSigner } from "ethers/lib/ethers";

export type LoanTermsPayload = {
  durationSecs: BigNumberish;
  deadline: BigNumberish;
  numInstallments: BigNumberish /* ONLY USED FOR INSTALLMENT LOANS. USE 0 FOR REGULAR LOANS*/;
  interestRate: ethers.BigNumber /* SEE HELPERS FILE ON HOW TO GENERATE THIS */;
  principal: ethers.BigNumber /* IN TERMS OF WEI */;
  /**
   * @dev This is the address of the collection used as collateral
   * For Direct ERC721 Asset loans it will be the address of the collection
   * For VAULT Loans it will be the VAULT FACTORY address. See config file
   */
  collateralAddress: string;
  /**
   * @dev This is the address of the tokenId used as collateral
   * For Direct ERC721 Asset loans it will be the tokenId of the asset
   * For VAULT Loans it will be the tokenId (decimal representation of the vault address) of the vault.
   */
  collateralId: BigNumberish;
  payableCurrency: string;
  /* this is the loanTerms nonce you get in response to GET /account/:walletAddress*/
  nonce: BigNumberish;
  /* states if you are signing as the borrower or lender BORROWER: 0 LENDER: 1*/
  side: 0 | 1;
};

interface TypeData {
  types: any;
  primaryType: any;
}

const typedLoanTermsData: TypeData = {
  types: {
    LoanTerms: [
      { name: "durationSecs", type: "uint32" },
      { name: "deadline", type: "uint32" },
      { name: "numInstallments", type: "uint24" },
      { name: "interestRate", type: "uint160" },
      { name: "principal", type: "uint256" },
      { name: "collateralAddress", type: "address" },
      { name: "collateralId", type: "uint256" },
      { name: "payableCurrency", type: "address" },
      { name: "nonce", type: "uint160" },
      { name: "side", type: "uint8" },
    ],
  },
  primaryType: "LoanTerms" as const,
};

const createLoanTermsPayload = ({
  durationSecs,
  deadline,
  interestRate,
  principal,
  collateralAddress,
  collateralId,
  payableCurrency,
  nonce,
  side,
}: LoanTermsPayload): LoanTermsPayload => {
  return {
    durationSecs,
    deadline,
    numInstallments: 0,
    interestRate: ethers.utils.parseUnits(`${interestRate}`, 0),
    principal: ethers.utils.parseUnits(`${principal}`, 0) /* IN TERMS OF WEI */,
    collateralAddress: collateralAddress,
    collateralId: collateralId,
    payableCurrency: payableCurrency,
    nonce:
      nonce /* this is the loanTerms nonce you get in response to GET /account/:walletAddress*/,
    side: side /* states if you are signing as the borrower or lender BORROWER: 0 LENDER: 1*/,
  };
};

// Structures into the EIP712 domain spec, using loanTermsPayload as the message.
const buildEIP712TypedData = async (
  loanTermsPayload: StructuredLoanTerms,
  verifyingContract: string
) => {
  return Object.assign({}, typedLoanTermsData, {
    domain: {
      name: "OriginationController",
      version: "2",
      chainId: CONFIG.domainData.chainId,
      verifyingContract,
    },
    message: loanTermsPayload,
  });
};

export const createLoanTermsSignature = async (
  loanTerms: LoanTermsPayload,
  signer: VoidSigner
) => {
  const loanTermsPayload = createLoanTermsPayload(loanTerms);
  const verifyingContract = CONFIG.contract.originationController.v2.address;
  const structuredData = await buildEIP712TypedData(
    loanTermsPayload,
    verifyingContract
  );

  let signature;
  // Ask the user to sign the message via MetaMask.
  try {
    signature = await signer._signTypedData(
      structuredData.domain,
      structuredData.types,
      structuredData.message
    );
  } catch (e) {
    // throw here, ur the sdk, let the client handle
    console.warn("User Rejected Signing", e);
  }
  return signature;
};
