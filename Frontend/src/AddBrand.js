import React from 'react'
import { addNewBrand } from './apis'
import './AddBrand.css'
import { SetupWeb3 } from './SetupWeb3'
import { addBrandOwner, createLoyaltyToken } from './contractFunctions'

class AddBrand extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brandData: {
        brandName: '',
        brandAddress: '',
        tokenName: '',
        tokenSymbol: '',
        tokenDecimal: '',
      },
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const res = await SetupWeb3()
    this.setState(prevState => ({
      web3info: { ...prevState.web3info, ...res },
    }))
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { brandData, web3info } = this.state
    const check = await web3info.contract.isBrandOwner(brandData.brandAddress)
    if (!check) {
      await addBrandOwner(brandData.brandAddress, web3info.contract)
    }
    brandData.tokenAddress = await createLoyaltyToken(
      brandData,
      web3info.contract
    )
    await addNewBrand(brandData)
  }

  handleChange(event) {
    const { target } = event
    const { value } = target
    const { name } = target
    this.setState(prevState => ({
      brandData: { ...prevState.brandData, [name]: value },
    }))
  }

  render() {
    const { brandData } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="brandName">
            brandName:
            <input
              type="text"
              name="brandName"
              onChange={this.handleChange}
              value={brandData.brandName}
            />
          </label>
          <label htmlFor="brandAddress">
            brandAddress:
            <input
              type="text"
              name="brandAddress"
              onChange={this.handleChange}
              value={brandData.brandAddress}
            />
          </label>
          <br />
          <label htmlFor="tokenName">
            tokenName:
            <input
              type="text"
              name="tokenName"
              onChange={this.handleChange}
              value={brandData.tokenName}
            />
          </label>
          <label htmlFor="tokenSymbol">
            tokenSymbol:
            <input
              type="text"
              name="tokenSymbol"
              onChange={this.handleChange}
              value={brandData.tokenSymbol}
            />
          </label>
          <label htmlFor="tokenDecimal">
            tokenDecimal:
            <input
              type="text"
              name="tokenDecimal"
              onChange={this.handleChange}
              value={brandData.tokenDecimal}
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default AddBrand
