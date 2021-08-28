import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Container } from '@material-ui/core';
import { Marker } from './Marker';
import { Address } from './Address';

export class Map extends Component {

  constructor() {
    super();
    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
      center: [],
      zoom: 11,
      lat: null,
      lng: null,
      draggable: true,
      address: null,
      order: {
        set: true,
        pickup: ' ',
        destination: ''
      }
    }
  }

  componentWillMount() {
    this.setCurrentLocation();
  }

  setPickup(e) {
    this.setState({
      order: {
        set: this.state.order.set,
        pickup: e,
        destination: this.state.order.destination
      }
    });
  }

  setDestination(e) {
    this.setState({
      order: {
        set: this.state.order.set,
        pickup: this.state.order.pickup,
        destination: e
      }
    });
  }

  _onChange = ({center, zoom}) => {
    this.setState({
        center: center,
        zoom: zoom,
    });
  }

  _onClick = (value) => {
    this.setState({
        lat: value.lat,
        lng: value.lng
    });
  }

  addPlaceP = (place) => {
    this.setState({
        places: [place],
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
    }, () => {
      this.setPickup(place);
      this._generateAddress(this.state.order.set);  
    });
  };

  addPlaceD = (place) => {
    this.setState({
        places: [place],
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
    }, () => {
      this.setDestination(place);
      this._generateAddress(this.state.order.set); 
    });
  };

  onMarkerInteraction = (childKey, childProps, mouse) => {
    this.setState({
        draggable: false,
        lat: mouse.lat,
        lng: mouse.lng
    });
  }

  onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
      this.setState({ draggable: true }, () => {
        this._generateAddress(this.state.order.set);
      });
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                center: [position.coords.latitude, position.coords.longitude],
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }
  }

  _onDrag(map) {
    console.log(map);
  }

  apiHasLoaded = (map, maps) => {
      this.setState({
          mapApiLoaded: true,
          mapInstance: map,
          mapApi: maps,
      }, () => {
        this._generateAddress(this.state.order.set);
      });
  };

  _generateAddress(par) {
    const {
        mapApi
    } = this.state;

    const geocoder = new mapApi.Geocoder();

    geocoder.geocode({ 'location': { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
            this.zoom = 12;
            this.setState({ address: results[0].formatted_address }, () => {
              if(par) {
                this.setState({
                  order: {
                    set: this.state.order.set,
                    pickup: this.state.address,
                    destination: this.state.order.destination,
                  }
                });
              }
              else {
                this.setState({
                  order: {
                    set: this.state.order.set,
                    pickup: this.state.order.pickup,
                    destination: this.state.address
                  }
                });
              }
            });
        } else {
            window.alert('No results found');
        }
      } else {
          window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  setBar = (b) => {
    if(b === "p") {
      this.setState({
        order: {
          set: true,
          pickup: this.state.order.pickup,
          destination: this.state.order.destination
        }
      });
    }
    else if(b === "d") {
      this.setState({
        order: {
          set: false,
          pickup: this.state.order.pickup,
          destination: this.state.order.destination
        }
      });
    }
  }

  render() {
    
    const {
      mapApiLoaded, mapInstance, mapApi,
    } = this.state;

    return (
      <table style={{height: '100vh', width: '100%' }}>
        <tr>
          <td style={{ height: '100vh', width: '60%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyAGz6Z8U8Y7jlT9abxQzDDlIHscbNn1cjI',
                libraries: ['places', 'geometry'],
              }}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
              // defaultCenter={this.props.center}
              // defaultZoom={this.props.zoom}
              zoom={this.state.zoom}
              center={this.state.center}
              draggable={this.state.draggable}
              onChange={this._onChange}
              onClick={this._onClick}
              onChildMouseDown={this.onMarkerInteraction}
              onChildMouseUp={this.onMarkerInteractionMouseUp}
              onChildMouseMove={this.onMarkerInteraction}
              onDrag={this._onDrag}>
              <Marker
                lat={this.state.lat}
                lng={this.state.lng}
                text="My Marker" color="blue" />
            </GoogleMapReact>
          </td>
          <td style={{height: '100vh'}}>
            <Container>
            {mapApiLoaded && (
                    <div>
                        <h2>Book the Intercity Ride!</h2>
                        <br />
                        <h4>Pickup Location</h4>
                        <Address key={this.state.order.pickup} address={this.state.order.pickup} map={mapInstance} mapApi={mapApi} addplace={this.addPlaceP} identity="p" bar={this.setBar} />
                        <br />
                        <h4>Destination Location</h4>
                        <Address key={this.state.order.destination} address={this.state.order.destination} map={mapInstance} mapApi={mapApi} addplace={this.addPlaceD} identity="d" bar={this.setBar} />        
                    </div>
            )}
            </Container>
          </td>
        </tr>
      </table>
    );
  }
}

export default Map;