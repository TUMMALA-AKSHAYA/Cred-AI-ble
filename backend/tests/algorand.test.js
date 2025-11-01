const algosdk = require('algosdk');
const algorandService = require('../services/algorandService');

// Test configuration
const algodClient = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');

describe('Algorand Integration Tests', () => {
  
  test('Should connect to Algorand TestNet', async () => {
    try {
      const status = await algodClient.status().do();
      expect(status).toHaveProperty('last-round');
      console.log('✅ Connected to Algorand TestNet');
      console.log('Current round:', status['last-round']);
    } catch (error) {
      console.error('❌ Failed to connect:', error);
      throw error;
    }
  });

  test('Should generate new Algorand account', () => {
    const account = algorandService.createAccount();
    expect(account).toHaveProperty('address');
    expect(account).toHaveProperty('mnemonic');
    expect(account.address).toMatch(/^[A-Z2-7]{58}$/);
    console.log('✅ Account generated:', account.address.substring(0, 10) + '...');
  });

  test('Should get treasury account balance', async () => {
    const treasuryAddress = 'PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M';
    const balance = await algorandService.getBalance(treasuryAddress);
    expect(balance).toHaveProperty('balance');
    expect(typeof balance.balance).toBe('number');
    console.log('✅ Treasury balance:', balance.balance, 'ALGO');
  });

  test('Should validate mnemonic conversion', () => {
    const testMnemonic = 'half organ scene upon embark salon nothing thank execute indicate myself spread offer eternal pigeon ticket virtual better bitter joy winter option modify abandon inmate';
    const account = algosdk.mnemonicToSecretKey(testMnemonic);
    const address = algosdk.encodeAddress(account.addr.publicKey);
    expect(address).toBe('PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M');
    console.log('✅ Mnemonic validation passed');
  });

});

// Run tests
console.log('🧪 Running Algorand Integration Tests...\n');
