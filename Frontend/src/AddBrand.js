import config from './config.js'
import React from 'react'


class AddBrand extends React.Component {
    state = {
        brandName: ""
    }

    handleChange = event =>{
        this.setState({brandName: event.target.value})
    };

    handleSubmit = event =>{
        event.preventDefault();
    
        const brand = {
            brandName: this.state.brandName
          };

        fetch(`${config.development.backenUrl}/addBrand`, { 
            method: 'post',
            body: JSON.stringify(brand)})
            .then(res => res.json())
            .catch(err=>console.log(err))
    }
      
    // axios
    // .post(`${config.development.backenUrl}/getBrandList`, { brand })
    // .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   });
    // };
    render(){
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                    Brand:
                    <input type="text" name ="brandName" onChange={this.handleChange}/>
                    </label>
                    <button type = "submit">Add</button>
                </form>
            </div>
        );
    }
}

export default AddBrand;