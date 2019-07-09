import axios from 'axios';
import React from 'react';
import config from '../config.js'



class AddBrand extends React.Component {
    state = {
        brandName: ""
    }

    handleChange = event =>{
        this.setState({Links: event.target.value})
    };

    handleSubmit = event =>{
        event.preventDefault();
    
        const brand = {
            brandName: this.state.brandName
          };
      
    axios
    .post(`${config.development.backenUrl}/getBrandList`, { brand })
    .then(res => {
        console.log(res);
        console.log(res.data);
      });
    };
    render(){
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                    Links:
                    <input type="text" name ="brandName" onChange={this.handleChange}/>
                    </label>
                    <button type = "submit">Add</button>
                </form>
            </div>
        );
    }
}