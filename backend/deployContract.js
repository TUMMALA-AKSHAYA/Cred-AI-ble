const algosdk = require('algosdk');

// TestNet configuration
const algodToken = '';
const algodServer = 'https://testnet-api.algonode.cloud';
const algodPort = 443;

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

// Your treasury mnemonic
const MNEMONIC = 'error brown assume flush crawl make net hundred gentle mystery bulb about occur mammal sweet live clean leisure spawn betray remove execute bag able limb';

// Simple approval program (in TEAL)
const approvalProgram = `#pragma version 8
txn ApplicationID
int 0
==
bnz create
txn OnCompletion
int NoOp
==
bnz handle_noop
int 0
return
create:
int 1
return
handle_noop:
int 1
return`;

// Clear state program
const clearProgram = `#pragma version 8
int 1
return`;

async function deployContract() {
    try {
        console.log('🚀 Starting deployment to Algorand TestNet...');
        
        // Get account from mnemonic
        const account = algosdk.mnemonicToSecretKey(MNEMONIC);
        
        // Use the address that worked
        const deployerAddr = 'XSYPMWXX5L5E5PNEIFPV65EEDZCEQPP5GSV2FJPFWCXN5V53I2G7HW6YWY';
        
        console.log('📍 Deploying from:', deployerAddr);
        
        // Check balance
        const accountInfo = await algodClient.accountInformation(deployerAddr).do();
        const balance = Number(accountInfo.amount) / 1000000;
        console.log('💰 Balance:', balance, 'ALGO ✅');
        
        // Get suggested params
        const params = await algodClient.getTransactionParams().do();
        
        // Compile programs
        console.log('⚙️ Compiling smart contract...');
        const approvalCompiled = await algodClient.compile(approvalProgram).do();
        const clearCompiled = await algodClient.compile(clearProgram).do();
        
        const approvalBytes = new Uint8Array(Buffer.from(approvalCompiled.result, 'base64'));
        const clearBytes = new Uint8Array(Buffer.from(clearCompiled.result, 'base64'));
        
        // Create application transaction using makeApplicationCreateTxnFromObject
        console.log('📝 Creating application transaction...');
        
        const txn = algosdk.makeApplicationCreateTxnFromObject({
            from: deployerAddr,
            suggestedParams: params,
            onComplete: algosdk.OnApplicationComplete.NoOpOC,
            approvalProgram: approvalBytes,
            clearProgram: clearBytes,
            numLocalInts: 0,
            numLocalByteSlices: 0,
            numGlobalInts: 2,
            numGlobalByteSlices: 2,
        });
        
        // Sign transaction
        console.log('✍️ Signing transaction...');
        const signedTxn = txn.signTxn(account.sk);
        
        // Send transaction
        console.log('📤 Sending to TestNet...');
        const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
        console.log('📋 Transaction ID:', txId);
        
        // Wait for confirmation
        console.log('⏳ Waiting for confirmation (~4 seconds)...');
        const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
        
        // Get application ID
        const appId = confirmedTxn['application-index'];
        
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅✅✅ CONTRACT DEPLOYED SUCCESSFULLY! ✅✅✅');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n📱 APP ID:', appId);
        console.log('🔗 LORA: https://lora.algokit.io/testnet/application/' + appId);
        console.log('🔍 TX: https://lora.algokit.io/testnet/transaction/' + txId);
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 COPY THIS APP ID:', appId);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        return appId;
        
    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        if (error.response && error.response.body) {
            console.error('API Response:', JSON.stringify(error.response.body, null, 2));
        }
        throw error;
    }
}

// Run deployment
deployContract()
    .then((appId) => {
        console.log('✨✨✨ SUCCESS! ✨✨✨');
        console.log('\n📋 CHECKLIST:');
        console.log('☐ 1. Open LORA link above');
        console.log('☐ 2. Take screenshot');
        console.log('☐ 3. Add App ID to README');
        console.log('☐ 4. Update all links to use LORA');
        console.log('☐ 5. Record video');
        console.log('☐ 6. Submit form');
        console.log('☐ 7. DELETE deployContract.js!\n');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Deployment failed');
        process.exit(1);
    });