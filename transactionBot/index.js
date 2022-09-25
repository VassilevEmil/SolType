const solanaWeb3 = require("@solana/web3.js");
const searchAddress = "4TtzM6p8mVPs7MGPHTovsVCCzhG1aHP67RzSnayxdeZf";
const endpoint =
  "https://snowy-fabled-silence.solana-devnet.discover.quiknode.pro/8142994a617fd74251737e3c72b1fcd60d614ab0/";
const solanaConnection = new solanaWeb3.Connection(endpoint);

const getTransactions = async (address) => {
  const pubKey = new solanaWeb3.PublicKey(address);
  let transactionList = await solanaConnection.getSignaturesForAddress(pubKey);

  let signatureList = transactionList.map(
    (transaction) => transaction.signature
  );
  let transactionDetails = await solanaConnection.getParsedTransactions(
    signatureList
  );

  transactionList.forEach((transaction, i) => {
    const date = new Date(transaction.blockTime * 1000);
    const transactionInstructions =
      transactionDetails[i].transaction.message.instructions;
    console.log(`Transaction No: ${i + 1}`);
    console.log(`Signature: ${transaction.signature}`);
    console.log(`Time: ${date}`);
    console.log(`Status: ${transaction.confirmationStatus}`);
    transactionInstructions.forEach((instruction, n) => {
      console.log(
        `---Program Instructions ${n + 1}: ${
          instruction.program ? instruction.program + ":" : ""
        } ${instruction.programId.toString()}`
      );
    });
    console.log("-".repeat(20));
  });
};

getTransactions(searchAddress, 3);
