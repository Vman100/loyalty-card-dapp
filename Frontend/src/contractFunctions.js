export const addBrandOwner = async (address, contract) => {
  try {
    const tx = await contract.addBrandOwner(address)
    const receipt = await tx.wait(2)
    const log = receipt.events.pop().args[0]
    return log
  } catch (error) {
    return error
  }
}

export const createLoyaltyToken = async (tokenData, contract) => {
  try {
    const tx = await contract.createLoyaltyToken(
      tokenData.tokenName,
      tokenData.tokenSymbol,
      tokenData.tokenDecimal
    )
    const receipt = await tx.wait(4)
    const log = receipt.events.pop().args[0]
    return log
  } catch (error) {
    return error
  }
}
