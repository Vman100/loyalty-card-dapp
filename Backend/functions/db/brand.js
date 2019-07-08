const ethers = require('ethers')
const Web3 = require('web3')
const LoyaltyTokenNotary = require('../contracts/LoyaltyTokenNotary');
const web3 = new Web3(new Web3.providers.HttpProvider(`https://kovan.infura.io/v3/${process.env.PROJECTID}`))
const provider = new ethers.providers.Web3Provider(web3.currentProvider)
const signer = provider.getSigner()
const contract = new ethers.Contract(LoyaltyTokenNotary.address, LoyaltyTokenNotary.abi, signer)

exports.createLoyaltyToken = async (brandData) => {
  try {
    contract.on("BrandOwnerAdded", (address) => {
      console.log("new Brand Owner added with ", address)
    })

    contract.on("ContractCreated", (address) => {
      console.log("new LoyaltyToken created at", address)
      brandData[tokenAddress] = address
    })
    const check = await contract.isBrandOwner(brandData.brandAddress)
    if(!check){
      await contract.addBrandOwner(brandData.brandAddress)
    }
    const brandAddressSigner = await provider.getSigner(brandData.brandAddress)
    const contractWithBrandSigner = await contract.connect(brandAddressSigner)
    await contractWithBrandSigner.createLoyaltyToken(brandData.tokenName, brandData.tokenSymbol, brandData.tokenDecimal)
    return brandData  
  } catch(err){
    let res = JSON.parse(err.responseText)
    console.log(res.error.message)
    return res
  }
}


exports.getByBrandAddress = async (database, brandAdress) => {
  try {
    const response = await database.ref().child('Brands')
    .orderByChild('brandAddress').equalTo(brandAdress).once("value")
    console.log('response', response.exists())
    return response.exists();
  } catch(err) {
    return err
  }
}

exports.getBrandList = async (database) => {
  try {
    const response = await database.ref('Brands').once('value')
    console.log('response', response.val())
    return response.val();
  } catch(err) {
    return err
  }
}

exports.getBrandById = async (database, id) => {
  try {
    const response = await database.ref('Brands/' + id).once('value')
    console.log('response', {[id]: response.val()})
    return {[id]: response.val()};
  } catch (err) {
    return err
  }
}

exports.addNewBrand = async (database, brandData) => {
  try {
    const newBrandkey = await database.ref().child('Brands').push().key;
    const updates = {}
    const path = "Brands/" + newBrandkey
    updates[path] = { brandData }
    await database.ref().update(updates);
    return newBrandkey
  } catch(err) {
    return err
  }
}