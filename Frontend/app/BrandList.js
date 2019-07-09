import React from 'react';
// import { getMedia } from './apis';
import axios from 'axios';
import config from '../app/config.js'
import AddBrand from '../app/AddBrand'

class MediaList extends React.Component {
    state = {
        Brands: []
    };

    componentDidMount(){
       this.getBrands();
      };
    
    getBrands(){
        axios.get(`${config.development.backenUrl}/getBrandList`).then(res =>{
            const Brands = res.data.Brands;
            this.setState({ Brands });
        });
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