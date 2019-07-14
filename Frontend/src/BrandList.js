import React from 'react';
import { getBrandList } from './apis';
import AddBrand from './AddBrand'

class BrandList extends React.Component {
    state = {
        Brands: []
    };

    async componentDidMount(){
       const Brands = await getBrandList()
       this.setState({ Brands });
    };

    render(){
        return (
            <div>
                <AddBrand/>
                <ul>
                    {this.state.Brands.map((brand, index) =>(
                        <li key={index}>
                            {brand.brandName}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default BrandList;