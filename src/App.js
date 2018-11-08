import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import ListComponent from './ListComponent';
import MapComponent from './MapComponent';

import { Button, TextField, Typography } from '@material-ui/core';
import { styles } from './styles';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      addressInfo: {},
      suggestions: [],
      searched: '',
      listActive: false,
      searchedCoord: {},
      selectedCoord: {}
    };

    this.makeSuggestions = this.makeSuggestions.bind(this);
    this.handleChange =  this.handleChange.bind(this);
    this.searchAddress = this.searchAddress.bind(this);
    this.selectAddress = this.selectAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevState) {
    if(prevState.searched !== this.state.searched) {
      this.searchAddress(this.state.searched);
    }
  }

  searchAddress = (data) => {
    if(data !== '')
    {
      const API_PHOTON = `http://photon.komoot.de/api/?lang=en&limit=10&q=${this.state.searched}`;
      axios.get(API_PHOTON)
      .then((response) => {

        let addressInfo = response.data.features.map(res => {
          return {
              lon: parseFloat(res.geometry.coordinates[0],10),
              lat: parseFloat(res.geometry.coordinates[1],10),
              address:{
                  name:res.properties.name,
                  street: res.properties.street,
                  housenumber: res.properties.housenumber,
                  postcode:res.properties.postcode,
                  city:res.properties.city,
                  state:res.properties.state,
                  country:res.properties.country
              },
              original:{
                  formatted:res.properties.name,
                  details:res.properties
              }
          }
        });

        this.makeSuggestions(addressInfo);
        this.setState({addressInfo});        
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  makeSuggestions = (data) => {
    let list_suggestions = [];
    let suggestions = data.map((resp,index) =>{
      const country = (resp.address.country === undefined) ? '' : resp.address.country;
      const city = (resp.address.city === undefined) ? '' : resp.address.city+',';
      const street = (resp.address.street === undefined) ? '' : resp.address.street;
      const housenumber = (resp.address.housenumber === undefined) ? '' : resp.address.housenumber+',';
      // const postcode = (resp.address.postcode === undefined) ? '' : resp.address.postcode;
      // const state = (resp.address.state === undefined) ? '' : resp.address.state+',';
      const name = (resp.address.name === undefined) ? '' : resp.address.name+',';
      const longitude = resp.lon; 
      const latitude = resp.lat;
      
      list_suggestions = {id: index, coord: { longitude, latitude }, value: `${name} ${street} ${housenumber} ${city} ${country}`};

      return list_suggestions;
    });
  
    this.setState({suggestions});
  }

  handleChange = (e) => {
    let text = e.target.value;
    this.setState({ 
      searched: text,
      listActive: true
    });
  }

  //OnClick Listcomponent
  selectAddress = (e) => {
    const suggestions = [...this.state.suggestions];
    const selectAddress = suggestions.filter(s => s.id === parseInt(e.target.id,10) );
    
    this.setState({ 
      searched: selectAddress[0].value, 
      listActive: false,
      searchedCoord: selectAddress[0].coord
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { searchedCoord } = this.state;
    this.setState({ selectedCoord: searchedCoord });
  }


  render() {

    const { suggestions, searched, listActive, selectedCoord } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.typography} variant="h6" gutterBottom>
          ReactJS + Openlayers + Material UI + Photon Geocoder
        </Typography>
        <div className={classes.container}>
            <form autocomplete="off" onSubmit={this.handleSubmit}>
              <TextField 
                type="text" 
                name="search" 
                placeholder="Search Address"
                value={searched} 
                onChange={this.handleChange} 
                className={classes.textField}
              /> 

              {
                searched === '' ? null :
                <Button 
                  variant="contained" 
                  color="primary" 
                  type="submit"
                  id="btnSearch"
              >
                  Search
              </Button>
              }
              {
                listActive === false || searched === '' ? null : <ListComponent suggestions={suggestions} selectAddress={this.selectAddress}/>
              }
            </form>
          </div>
          <MapComponent coordAddress={selectedCoord} />
        </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);