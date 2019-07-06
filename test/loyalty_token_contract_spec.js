const LoyaltyTokenNotary = require('Embark/contracts/LoyaltyTokenNotary')
const LoyaltyToken = require('Embark/contracts/LoyaltyToken');

function didRevertCorrectly(actualError, expectedError) {
  return actualError.includes(expectedError);
}

let expectedErrorMessages = {
  "owner": "Ownable: caller is not the owner",
  "isBrandOwner": "caller is not a brand owner",
  "brandOwnerExists": "supplied address is already a brand owner"
}

let accounts;

config({
  contracts: {
    "LoyaltyTokenNotary": {
    },
    "LoyaltyToken": {
      args: ["$accounts[2]", "BrandACoin", "BAC", "18"]
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("LoyaltyTokenNotary", function () {
  this.timeout(0);

  it("owner can add a new brand owner", async function () {
    let result = await LoyaltyTokenNotary.methods.addBrandOwner(accounts[2]).send();
    let log = result.events.BrandOwnerAdded;
    assert.ok(log.returnValues[0]);
  });

  it("non owner cannot add a new brand owner", async function () {
    try {
      await LoyaltyTokenNotary.methods.addBrandOwner(accounts[2]).send({from: accounts[1]});
    }catch(error){
      assert.ok(didRevertCorrectly(error.message,expectedErrorMessages["owner"]))
    }
  });

  it("A brand owner can only be added once", async function () {
    try {
      await LoyaltyTokenNotary.methods.addBrandOwner(accounts[2]).send();
    }catch(error){
      assert.ok(didRevertCorrectly(error.message,expectedErrorMessages["brandOwnerExists"]))
    }
  });

  it("A brand owner can create a new LoyaltyToken contract", async function () {
    let result = await LoyaltyTokenNotary.methods.createLoyaltyToken('BrandBCoin','BBC','18').send({from: accounts[2]});
    let log = result.events.ContractCreated;
    assert.ok(log.returnValues[0]);
  });

  it("A brand non owner cannot create new LoyaltyToken contract",async function () {
    try {
    await LoyaltyTokenNotary.methods.createLoyaltyToken('BrandBCoin','BBC','18').send();
    }catch(error){
      assert.ok(didRevertCorrectly(error.message,expectedErrorMessages["isBrandOwner"]))
    }
  });

  it("can get array of registered LoyaltyTokens", async function () {
    let result = await LoyaltyTokenNotary.methods.getRegisteredLoyaltyTokens().call()
    assert.ok(result)
  });

})

contract("LoyaltyToken", function () {
  this.timeout(0);

  it("can get LoyaltyToken Details", async function () {
    let details = await LoyaltyToken.methods.getLoyaltyTokenDetails().call()
    assert.ok(details)
  })
})