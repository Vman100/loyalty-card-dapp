import React from 'react';
import config from '../app/config.js'
import AddBrand from '../app/AddBrand'

class BrandList extends React.Component {
    state = {
        Brands: []
    };

    componentDidMount(){
        fetch(`${config.development.backenUrl}/getBrandList`)
            .then(res =>res.json())
            .then(data => this.setState({Brands : data.Brands}))
      };
    

    render(){
        return (
            <div>
                <AddBrand/>
                <ul>
                    {this.state.Brands.map(brand =>(
                        <li>
                            {brand.brandName}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default MediaList;