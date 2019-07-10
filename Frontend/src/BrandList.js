import React from 'react';
import config from './config.js'
import AddBrand from './AddBrand.js'

class BrandList extends React.Component {
    state = {
        Brands: []
    };

    componentDidMount(){
        fetch(`${config.development.backenUrl}/getBrandList`)
            .then(res =>res.json())
            .then(data => this.setState({Brands : data}))
      };
    

    render(){
        return (
            <div>
                <AddBrand/>
                <ul>
                    {this.state.Brands}
                </ul>
            </div>
        );
    }
}

export default BrandList;