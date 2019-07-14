import { ethers } from 'ethers'
import contractInfo from './contracts/LoyaltyTokenNotary'

export const SetupWeb3 = async () => {
  if (window.ethereum) {
    try {
      if (typeof window.ethereum.selectedAddress === 'undefined') {
        await window.ethereum.enable()
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        contractInfo.address,
        contractInfo.abi,
        signer
      )
      return {
        account: window.ethereum.selectedAddress,
        web3: window.web3,
        provider,
        signer,
        contract,
        hasErrored: false,
      }
    } catch (error) {
      return {
        hasErrored: true,
        message: 'You denied access to your metamask.',
      }
    }
  }
}
