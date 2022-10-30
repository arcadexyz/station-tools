import { CONFIG } from "config/config";
import { ethers, BigNumberish } from "ethers";
import { VoidSigner } from "ethers/lib/ethers";
import { LoanTermsPayload, StructuredLoanTerms } from "./index";

export type LoanTermsPayload = {
  payableCurrency: string;
  durationSecs: BigNumberish;
  principal: ethers.BigNumber;
  interestRate: ethers.BigNumber;
  deadline: BigNumberish;
  nonce: BigNumberish;
  collateralId: BigNumberish;
  collateralAddress: string;
  numInstallments: BigNumberish;
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
  payableCurrency,
  durationSecs,
  principal,
  interestRate,
  collateralAddress,
  collateralId,
  deadline,
  nonce,
  side,
}: LoanTermsPayload): LoanTermsPayload => {
  return {
    durationSecs,
    deadline,
    numInstallments: 0,
    interestRate: ethers.utils.parseUnits(`${interestRate}`, 0),
    principal: ethers.utils.parseUnits(`${principal}`, 0),
    collateralAddress: collateralAddress,
    collateralId: collateralId,
    payableCurrency: payableCurrency,
    nonce: nonce,
    side: side,
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
