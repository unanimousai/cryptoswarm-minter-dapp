require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "CryptoSwarm AI";
const description = `CryptoSwarm AI is a collective Super Intelligence for predicting crypto assets using hundreds of human forecasters and the power of Swarm AI.
 
Go to https://www.cryptoswarm.ai/ for more information, and join our Discord: https://discord.gg/4g2ccHE8cv
 
The Terms of Service of this NFT can be found in the NFT’s IPFS (https://ipfs.io/ipfs/bafkreibx363xs2jyvyrunk2rweaijr25w7qroy5auirpugco5qdl3dc3iy) and on the CryptoSwarm website here: https://www.cryptoswarm.ai/legal`;

const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

const layerConfigurations = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Background" },
      { name: "Eyeball" },
      { name: "Eye color" },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid" },
      { name: "Top lid" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 512,
  height: 512,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://codecats.xyz", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'goerli'; // only rinkeby, polygon, or ethereum

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'CryptoSwarm AI';
const CONTRACT_SYMBOL = 'CSAI';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0xcdC2803abF895c32F1EcCBfca6a78CcEFB7d786B';
const TREASURY_ADDRESS = '0x377f2fd104692E592A5259cF75756037AE180fcb';
const MAX_SUPPLY = 350; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.001; // TODO: CHANGE! Minting price per NFT. Rinkeby = ETH, Ethereum = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 5; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!
const TEAM_RESERVE = 66; // How many of the max supply can we mint for free

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-10-14T20:00:00+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-10-14T19:00:00+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0xcdC2803abF895c32F1EcCBfca6a78CcEFB7d786B"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = [
  "0xC9d2De58EF8c12C8Dc40d35f0763135c68D33201", // Test accounts
  "0xDe61E744E7C7A18B049f5308aDe2109dFc7F3620", // Test accounts
  "0x0d798b192a2652658515b7a6E51D6e01C8f8e00E", // Test accounts
  "0x9E5F1C986152358b415ba2164Bd8431Ccbd5aBf3", // Test accounts
  "0xcF196E948cB0A1f8fD69C1CF7ad6098710788AF4", // Owner account
  "0xcdC2803abF895c32F1EcCBfca6a78CcEFB7d786B", // Genius collective account for revenue share
  "0xDe61E744E7C7A18B049f5308aDe2109dFc7F3620", // From discord bot round 1
  "0x7768BEb2b062dC7a7242d872219dE436949BD3Eb", // From discord bot round 1
  "0x0A39967415AAD84e563203871c140a2e7D5F3345", // From discord bot round 1
  "0x218bEdDbe74e98f8D79041E2dFcF4033D4f72D79", // From discord bot round 1
  "0xc6ddD3E9e2debb5247877Fc16160963682b6d1B3", // From discord bot round 1
  "0xfA075e0967D2f8dD109082ee63339900f92D3db5", // From discord bot round 1
  "0x32fc89eA9895Bf05E4C5086A7a7a48d622a0CafF", // From discord bot round 1
  "0x58adc13aA913c0dc6D343E31161AEfF6E48b71DC", // From discord bot round 1
  "0xe33EC84f97dd49FCFE28e6918E23401C8eD77d32", // From discord bot round 1
  "0x71cEFBdb39DE12EEa167Eb0832A84d15C287a4B3", // From discord bot round 1
  "0x2227116491503777e1Ce751c5F2477f918fc07fE", // From discord bot round 1
  "0x4fbfadF58cf32E7c616ED09D74318fe30C7071d4", // From discord bot round 1
  "0x33e8f471701B082A37a2d08f038646BD01d8B526", // From discord bot round 1
  "0x9E2Ac8A126f652153990F235766f86561d414031", // From discord bot round 1
  "0x8e5C702f15d7Fa4b129aF7d538804Bd7a0DA2D57", // From discord bot round 1
  "0x1336b731a7F9C7cBd6a80C422a0d7De1e853737c", // From discord bot round 1
  "0x04893a2D170bE9Da12bB86e33eA38ae4624783Bc", // From discord bot round 1
  "0xA29565Dfb42dA36Dbf63933C45A07354c97a7210", // From discord bot round 1
  "0xb232519FA664c04BF642bb587c1DD304ae2d8255", // From discord bot round 1
  "0xD88DD72D7f19AF6487a45DeE4f4c5F888ba9007a", // From discord bot round 1
  "0x24720B809D7168854080D638Dc125Ba81570C585", // From discord bot round 1
  "0x868F0CAa91d1949c26eB4fA61cB5c38BE30b2b9b", // From discord bot round 1
  "0xf3296be8CA241Ed03111b732810691DD01716543"  // From discord bot round 1
]; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = false; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "CryptoSwarm AI is a collective Super Intelligence for predicting crypto assets using hundreds of human forecasters and the power of Swarm AI."; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/QmUf9tDbkqnfHkQaMdFWSGAeXwVXWA61pFED7ypx4hcsfh"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK") {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES,
  TEAM_RESERVE
};
