const algosdk = require('algosdk');

const client = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', 443);
const mnemonic = 'error brown assume flush crawl make net hundred gentle mystery bulb about occur mammal sweet live clean leisure spawn betray remove execute bag able limb';

const approval = `#pragma version 8
txn ApplicationID
bz create
int 1
return
create:
int 1`;

const clear = `#pragma version 8
int 1`;

(async () => {
    const acc = algosdk.mnemonicToSecretKey(mnemonic);
    const addr = algosdk.encodeAddress(acc.sk.subarray(32));
    console.log('From:', addr);
    
    const p = await client.getTransactionParams().do();
    const ap = await client.compile(approval).do();
    const cp = await client.compile(clear).do();
    
    const apb = new Uint8Array(Buffer.from(ap.result, 'base64'));
    const cpb = new Uint8Array(Buffer.from(cp.result, 'base64'));
    
    const tx = new algosdk.Transaction({
        type: 'appl',
        from: addr,
        fee: p.minFee,
        firstRound: p.firstRound,
        lastRound: p.lastRound,
        genesisID: p.genesisID,
        genesisHash: p.genesisHash,
        appApprovalProgram: apb,
        appClearProgram: cpb,
        appGlobalByteSlices: 2,
        appGlobalInts: 2,
        appLocalByteSlices: 0,
        appLocalInts: 0,
        appOnComplete: 0
    });
    
    const stx = tx.signTxn(acc.sk);
    const r = await client.sendRawTransaction(stx).do();
    console.log('TX:', r.txId);
    
    const conf = await algosdk.waitForConfirmation(client, r.txId, 4);
    const appId = conf['application-index'];
    
    console.log('\n✅ APP ID:', appId);
    console.log('🔗 https://lora.algokit.io/testnet/application/' + appId);
})();