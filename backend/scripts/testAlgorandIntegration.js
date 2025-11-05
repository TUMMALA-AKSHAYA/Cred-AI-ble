const { createAccount, getBalance } = require('../services/algorandService');

(async () => {
  console.log("🔍 Testing Algorand Integration...\n");

  // 1️⃣ Create a temporary new account
  const newAccount = createAccount();
  console.log("🆕 New Account Created:");
  console.log("Address:", newAccount.address);
  console.log("Mnemonic:", newAccount.mnemonic, "\n");

  // 2️⃣ Try fetching the balance of the new account
  const balance = await getBalance(newAccount.address);
  console.log("💰 Account Balance:", balance.balance, "Algos");
})();
