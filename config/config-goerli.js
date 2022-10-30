import ensAbi from "web3/abi/ens.json";
import vaultFactoryV2Abi from "web3/abi/vaultFactoryV2Abi.json";
import loanCoreV2Abi from "web3/abi/loanCoreV2Abi.json";
import ocAbi from "web3/abi/oc.json";
import repaymentControllerV2Abi from "web3/abi/repaymentControllerV2Abi.json";
import borrowerNoteV2Abi from "web3/abi/borrowerNoteV2Abi.json";
import lenderNoteV2Abi from "web3/abi/lenderNoteV2Abi.json";
import itemsVerifierV2Abi from "web3/abi/itemsVerifierV2Abi.json";
import assetVaultV2Abi from "web3/abi/assetVaultV2Abi.json";

const ethereum: any = {
  tokenByAddress: {
    "0x07865c6e87b9f70255377e024ace6630c1eaa37f": {
      name: "usdc",
      address: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
      decimals: 6,
      isEnabled: true,
    },
    "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6": {
      name: "weth",
      address: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
      decimals: 18,
      isEnabled: true,
    },
  },
  token: {
    usdc: {
      address: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
      name: "usdc",
      logo: "",
      decimals: 6,
      isEnabled: true,
    },
    weth: {
      address: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
      name: "weth",
      logo: "",
      decimals: "18",
      isEnabled: true,
    },
  },
  contract: {
    vaultFactory: {
      v2: {
        address: "0x0028BADf5d154DAE44F874AC58FFCd3fA56D9586",
        abi: vaultFactoryV2Abi,
      },
    },
    assetVault: {
      v2: {
        address: "0x7988Fb6D7Bac5Fe3F9746b2dF21013aa4747dCf0",
        abi: assetVaultV2Abi,
      },
    },
    loanCore: {
      v2: {
        address: "0x398DeEB51C56819880f2A2343705510A0c868747",
        abi: loanCoreV2Abi,
      },
    },
    originationController: {
      v2: {
        address: "0xc0209D538888C7779A9C5B43224F2D49EAbF86fd",
        abi: ocAbi,
      },
    },
    repaymentController: {
      v2: {
        address: "0xf925cC109F489fb930f793468A17d39d45C51AbB",
        abi: repaymentControllerV2Abi,
      },
    },
    borrowerNote: {
      v2: {
        address: "0xd691039144519D36bc819bc98C3202b46cB80293",
        abi: borrowerNoteV2Abi,
      },
    },
    lenderNote: {
      v2: {
        address: "0x7D1481418541812ef06217d2eD53fC8D0FF39D67",
        abi: lenderNoteV2Abi,
      },
    },
    itemsVerifier: {
      v2: {
        address: "0x782B2E4cCa4B5C75392846e73fAe83D3F6Ae85e8",
        abi: itemsVerifierV2Abi,
      },
    },
    ens: {
      address: "0x112234455c3a32fd11230c42e7bccd4a84e02010",
      abi: ensAbi,
    },
  },
  domainData: {
    name: "OriginationController",
    version: "2",
    chainId: 5,
  },
};

const services = {
  images: {
    url: `https://images.arcade.xyz/goerli`,
  },
};

export const CONFIG_GOERLI = {
  ...ethereum,
  ...services,
};
