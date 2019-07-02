const LoyaltyTokenNotary = require('Embark/contracts/LoyaltyTokenNotary');
const LoyaltyToken = require('Embark/contracts/LoyaltyToken');

function didRevertCorrectly(actualError, expectedError) {
  return actualError.includes(expectedError);
}

let expectedErrorMessages = {
  "owner": "caller is not owner",
}

let accounts;

config({
  contracts: {
    "LoyaltyTokenNotary": {},
    "LoyaltyToken": {
      args: ['$accounts[4]', "Brand ABC", "ABCCoin", "18"]
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("LoyaltyTokenNotary", function () {
  this.timeout(0);

  it("Owner can create new certificate contract", async function () {
    let result = await LoyaltyTokenNotary.methods.createCertificate('Brand ABC','ABCCoin','18').send();
    let log = result.events.ContractCreated;
    assert.ok(log.returnValues[0]);
  });

  it("non Owner cannot create new certificate contract",async function () {
    try {
    await LoyaltyTokenNotary.methods.createCertificate('Brand ABC','ABCCoin','18').send({from: accounts[1]});
    }catch(error){
      assert.ok(didRevertCorrectly(error.message,expectedErrorMessages["owner"]))
    }
  });

  it("can get array of registered cerificates", async function () {
    let result = await LoyaltyTokenNotary.methods.getRegisteredCertificates().call()
    assert.ok(result)
  });

})

// contract("LoyaltyToken", function () {
//   this.timeout(0);

//   it("verifiers can get certificate details", async function () {
//     let result = await LoyaltyToken.methods.getCertificateDetails().call();
//     let result2 = await LoyaltyToken.methods.getCertificateDetails().call({from: accounts[4]});
//     assert.deepEqual(result, result2)
//   });

//   it("non verifier cannot get certificate details", async function () {
//     try{
//     await LoyaltyToken.methods.getCertificateDetails().call({from: accounts[5]});
//     }catch(error){
//       assert.ok(didRevertCorrectly(error.message,expectedErrorMessages["verifier"]))
//     }
//   });

//   it("Owner can add a new verifier", async function () {
//     let result = await LoyaltyToken.methods.addVerifier(accounts[3]).send({from: accounts[4]});
//     log = result.events.verifierAdded;
//     assert.equal(log.returnValues[0], accounts[3])
//   });

//   it("non Owner cannot add a new verifier", async function () {
//     try{
//     await LoyaltyToken.methods.addVerifier(accounts[1]).send({from: accounts[5]});
//     }catch(error){
//       assert.ok(didRevertCorrectly(error.message,expectedErrorMessages["owner"]))
//     }
//   });
// })