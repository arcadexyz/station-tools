import { toEther } from "utils/formatCurrency";
import { CONFIG } from "config/config";
import { BigNumber } from "bignumber.js";
import { CONSTANTS } from "data/constants";
import { ethers } from "ethers";

type Props = {
  principal: BigNumber;
  repayment: BigNumber;
  durationInDays: number;
};

/* Important Calculation and formatting functions  */

export const toInterestAmount = (principal: string, interestRate: string) => {
  const repayment = calculateRepayment({ principal, interestRate });
  const interest = repayment.minus(new BigNumber(principal)).toFixed(0);

  return interest;
};

export const calculateAPR = ({
  principal,
  repayment,
  durationInDays,
}: Props): BigNumber => {
  // formulae APR = ((InterestAmt + Fees / Principal) / DurationInDays)) x 365 x 100

  const interestAmt = repayment?.minus(principal);
  const initial = interestAmt.div(principal);
  const base = initial.div(durationInDays);
  const apr = base.times(36500);
  return apr;
};

export const calculateDays = (seconds?: string) => {
  if (!seconds) return 0;
  const days = parseInt(seconds) / CONSTANTS.ONE_DAY_SECONDS;
  return days;
};

// protocol consider 0.01% as 1 * 10**18

// Input conversion: 0.01% = (1 * 10**18) ,  10.00% = (1000 * 10**18)
// This represents the rate over the lifetime of the loan, not APR.
// 0.01% is the minimum interest rate allowed by the protocol.

// 1% = 100 * 10 ** 18 or 1e20
// 10% = 1000 * 10 ** 18 or 1e21
// 20% = 2000 * 10 ** 18 or 2e21

// returns interest rate in the format that the protocol expects
type ProtocolInterest = { formatted: string; interestInWei: ethers.BigNumber };
export const calculateProtocolInterestRate = ({
  principal,
  repayment,
}: {
  principal: string;
  repayment: string;
}): ProtocolInterest => {
  const principalBn = new BigNumber(principal);
  const repaymentBn = new BigNumber(repayment);

  const formatted = repaymentBn
    .minus(principalBn)
    .div(principalBn)
    .times(100)
    .toFixed();

  const protocolInterest = repaymentBn
    .minus(principalBn)
    .div(principalBn)
    .times(10000)
    .toFixed();

  const interestInWei = ethers.utils.parseEther(protocolInterest);
  console.log("interest: ", `${interestInWei}`);
  return { formatted, interestInWei };
};

export const calculateProtocolPrincipal = ({
  principal,
  payableCurrency,
}: {
  principal: string;
  payableCurrency: "usdc" | "weth";
}): ethers.BigNumber => {
  const decimals = CONFIG.token[payableCurrency].decimals;
  return ethers.utils.parseUnits(`${principal}`, decimals);
};

export const calculateRepayment = ({
  principal,
  interestRate,
}: {
  principal: string;
  interestRate: string;
}): BigNumber => {
  const principalInBN = new BigNumber(principal);
  const interestRateBN = new BigNumber(interestRate);
  const repayment = principalInBN.plus(
    principalInBN
      .times(interestRate)
      .div(10 ** 18)
      .div(10000)
  );

  return repayment;
};

export const calculateRepaymentFromApr = ({
  apr,
  durationInDays,
  principal,
}: {
  apr: BigNumber;
  durationInDays: number;
  principal: BigNumber;
}): BigNumber => {
  // formulae interest = ((apr * durationInDays) / 365 * 100) * principal
  // formulae repayment = principal + interest

  const ratePerDay = apr?.div(36500);
  const interestForDuration = ratePerDay?.times(durationInDays);
  const totalInterestAmount = principal.times(interestForDuration);
  const repaymentAmount = principal.plus(totalInterestAmount);

  return repaymentAmount;
};

const makeDurationInSecs = (durationNumber: number, unit: "weeks" | "days") => {
  const durationInSecs =
    unit === "weeks"
      ? durationNumber * CONSTANTS.ONE_WEEK_SECONDS
      : durationNumber * CONSTANTS.ONE_DAY_SECONDS;
  return durationInSecs;
};

const makeDeadline = (timeInMs?: number) => {
  const deadline = Math.round((Date.now() + CONSTANTS.TWO_WEEKS) / 1000);
  return deadline;
};

const makePayableCurrency = (name: "weth" | "usdc") => {
  const decimals = CONFIG.token[name].decimals;
  const address = CONFIG.token[name].address;
  return { decimals, address };
};
