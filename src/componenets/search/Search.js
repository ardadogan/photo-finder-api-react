import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';



class Search extends Component {
    state = {
        searchText: '',
        color: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api/',
        apiKey: '10124271-467459bb5aee8b493626b4cc8',
        images: []
    };

    colors = [
        { value: 0, color: 'transparent' },
        { value: 1, color: 'red' },
        { value: 2, color: 'orange' },
        { value: 3, color: 'yellow' },
        { value: 4, color: 'green' },
        { value: 5, color: 'turquoise' },
        { value: 6, color: 'blue' },
        { value: 7, color: 'lilac' },
        { value: 8, color: 'pink' },
        { value: 9, color: 'white' },
        { value: 10, color: 'black' }
    ];

    style = {
        padding: 12,
        textAlign: 'center'
    }

    position = {
        float: 'left'
    }

    onTextChange = e => {
        const val = e.target.value;
        this.setState({ [e.target.name]: val }, () => {
            if (val === '') {
                this.setState({ images: [] });
            } else {
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&colors=${this.state.color}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                    .then(res => this.setState({ images: res.data.hits }))
                    .catch(err => console.log(err));
            }
        });
    };

    onAmountChange = (e, index, value) => this.setState({ amount: value });

    onFilterChange = (e, index, value) => this.setState({ color: value });

    render() {
        console.log(this.state.color);
        return (
            <div style={this.style}>
                <TextField
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="Search For Images"
                    fullWidth={false}
                />
                <br />
                <div>
                    <SelectField
                        name="amount"
                        floatingLabelText="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    >
                        <MenuItem value={5} primaryText="5" />
                        <MenuItem value={10} primaryText="10" />
                        <MenuItem value={15} primaryText="15" />
                        <MenuItem value={30} primaryText="30" />
                        <MenuItem value={50} primaryText="50" />
                    </SelectField>

                    <SelectField
                        name="color"
                        floatingLabelText="Filter"
                        value={this.state.color}
                        onChange={this.onFilterChange}
                    >
                        <MenuItem value={'transparent'} primaryText="Transparent" />
                        <MenuItem value={'red'} primaryText="Red" />
                        <MenuItem value={'orange'} primaryText="Orange" />
                        <MenuItem value={'yellow'} primaryText="Yellow" />
                        <MenuItem value={'green'} primaryText="Green" />
                        <MenuItem value={'turquoise'} primaryText="Turquoise" />
                        <MenuItem value={'blue'} primaryText="Blue" />
                        <MenuItem value={'lilac'} primaryText="Lilac" />
                        <MenuItem value={'pink'} primaryText="Pink" />
                        <MenuItem value={'white'} primaryText="White" />
                        <MenuItem value={'black'} primaryText="Black" />
                    </SelectField>
                </div>

                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
            </div>
        )
    }
}

export default Search;