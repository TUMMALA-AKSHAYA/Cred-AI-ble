const algorandService = require('../services/algorandService');

const account = algorandService.createAccount();

console.log('\n🎉 Treasury Account Generated!\n');
console.log('Address:', account.address);
console.log('\n⚠️  SAVE THIS MNEMONIC SECURELY:');
console.log(account.mnemonic);
console.log('\n📝 Add this to your .env file:');
console.log(`ALGORAND_TREASURY_MNEMONIC="${account.mnemonic}"`);
console.log('\n💰 Fund this account with TestNet ALGO:');
console.log('https://bank.testnet.algorand.network/');
console.log(`Paste address: ${account.address}\n`);
