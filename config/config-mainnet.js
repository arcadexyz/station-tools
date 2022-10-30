import cryptoPunksAbi from "abis/cryptoPunksAbi.json";
import assetWrapperV3Abi from "abis/assetWrapperV3.json";
import ensAbi from "abis/ens.json";
import vaultFactoryV2Abi from "abis/vaultFactoryV2Abi.json";
import loanCoreV2Abi from "abis/loanCoreV2Abi.json";
import originationControllerAbi from "abis/originationController.json";
import repaymentControllerV2Abi from "abis/repaymentControllerV2Abi.json";
import borrowerNoteV2Abi from "abis/borrowerNoteV2Abi.json";
import lenderNoteV2Abi from "abis/lenderNoteV2Abi.json";
import itemsVerifierV2Abi from "abis/itemsVerifierV2Abi.json";
import assetVaultV2Abi from "abis/assetVaultV2Abi.json";

const ethereum: any = {
  tokenByAddress: {
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
      name: "usdc",
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      logo: "usdc",
      decimals: 6,
      isEnabled: true,
    },
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
      name: "weth",
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      logo: "weth",
      decimals: 18,
      isEnabled: true,
    },
  },
  token: {
    usdc: {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      name: "usdc",
      logo: "usdc",
      decimals: 6,
      isEnabled: true,
    },
    weth: {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      name: "weth",
      logo: "weth",
      decimals: 18,
      isEnabled: true,
    },
  },
  contract: {
    vaultFactory: {
      v2: {
        address: "0x6e9B4c2f6Bd57b7b924d29b5dcfCa1273Ecc94A2",
        abi: vaultFactoryV2Abi,
      },
    },
    assetVault: {
      v2: {
        address: "0xd898456e39a461b102ce4626aac191582c38acb6",
        abi: assetVaultV2Abi,
      },
    },
    loanCore: {
      v2: {
        address: "0x81b2F8Fc75Bab64A6b144aa6d2fAa127B4Fa7fD9",
        abi: loanCoreV2Abi,
      },
    },
    originationController: {
      v2: {
        address: "0x4c52ca29388A8A854095Fd2BeB83191D68DC840b",
        abi: originationControllerAbi,
      },
    },
    repaymentController: {
      v2: {
        address: "0xb39dAB85FA05C381767FF992cCDE4c94619993d4",
        abi: repaymentControllerV2Abi,
      },
    },
    borrowerNote: {
      v2: {
        address: "0x337104A4f06260Ff327d6734C555A0f5d8F863aa",
        abi: borrowerNoteV2Abi,
      },
    },
    lenderNote: {
      v2: {
        address: "0x349A026A43FFA8e2Ab4c4e59FCAa93F87Bd8DdeE",
        abi: lenderNoteV2Abi,
      },
    },
    itemsVerifier: {
      v2: {
        address: "0xAbfD9D9E4157695DB5812eeE279D923a4f948Df0",
        abi: itemsVerifierV2Abi,
      },
    },
    ens: {
      address: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
      abi: ensAbi,
    },
    cryptoPunks: {
      address: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
      abi: cryptoPunksAbi,
    },
  },
  domainData: {
    name: "OriginationController",
    version: "2",
    chainId: 1,
  },
};

const services = {
  images: {
    url: `https://images.arcade.xyz`,
  },
};

export const CONFIG_MAINNET = {
  ...ethereum,
  ...services,
};
