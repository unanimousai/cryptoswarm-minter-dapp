const fetch = require('node-fetch')

const AUTH = process.env.NFTPORT_API_KEY;
const include = "merkle_proofs";

exports.handler = async (event, context) => {
  console.log("Event: ", event);
  console.log("context: ", context);
  const wallet = event.queryStringParameters && event.queryStringParameters.wallet
  const chain = event.queryStringParameters && event.queryStringParameters.chain
  const contract_address = event.queryStringParameters && event.queryStringParameters.contract
  const url = 'https://api.nftport.xyz/v0/me/contracts/collections?';
  console.log("chain: ", chain);
  console.log("wallet: ", wallet);
  console.log("contract addy: ", contract_address);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH
    }
  };
  const query = new URLSearchParams({
    chain: chain,
    include
  });

  const data = await fetch(url + query, options)
  const json = await data.json();
  console.log("JSON data: ", json);
  console.log("JSON contract: ", json.contracts);
  console.log("JSON matches: ", json.contracts.filter(contract => contract.address.toLowerCase() === contract_address.toLowerCase()));
  const contractInfo = json.contracts.filter(contract => contract.address.toLowerCase() === contract_address.toLowerCase());
  console.log("contractInfo: ", contractInfo[0]);
  const merkleProofs = contractInfo[contractInfo.length-1].merkle_proofs || {};
  const merkleProof = merkleProofs[wallet.toLowerCase()] || [];

  console.log("MADE IT! 200: ", JSON.stringify(merkleProof))
  return {
    'statusCode': 200,
    'headers': {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(merkleProof)
  }
}
