import React from 'react'
import './App.css'
import BrandList from './BrandList.js'
import { SetupWeb3 } from './SetupWeb3'

class App extends React.Component {
  state = { isLoading: true }

  async componentDidMount() {
    const res = await SetupWeb3()
    this.setState({ ...res })
    this.setState({ isLoading: false })
  }

  render() {
    const { hasErrored, message, isLoading } = this.state
    if (isLoading) {
      return <p>...Loading</p>
    }
    if (hasErrored) {
      return <p>{message}</p>
    }
    return (
      <div>
        <BrandList />
      </div>
    )
  }
}

export default App
