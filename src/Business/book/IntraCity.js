import React, { Component } from 'react';
import { Container, Button } from '@material-ui/core';
import { Map } from '../loc/Map';
import { Address } from '../loc/Address';

export class IntraCity extends Component {

    constructor() {
        super();

        this.state = {
            mapApiLoaded: false,
            mapApi: null,
            mapInstance: null,
            set: true,
            place: '',
            pickup: ' ',
            destination: ''
        }

        this.handleButton = this.handleButton.bind(this);
    }

    setMapApi = (m) => {
        this.setState({
            mapApi: m
        });
    }

    setMapInstance = (m) => {
        this.setState({
            mapInstance: m
        });
    }

    address = (a) => {
        if(this.state.set) {
            this.setState({
                pickup: a
            });
        }
        else {
            this.setState({
                destination: a
            });
        }
    }

    setApi = (b, m, ms) => {
        this.setState({
            mapApiLoaded: b,
            mapInstance: m,
            mapApi: ms
        });
    }

    addPlace = (p) => {
        this.setState({
            place: p
        });
    }

    setBar = (b) => {
        if(b === "p") {
          this.setState({
            set: true,
            pickup: this.state.pickup,
            destination: this.state.destination
          }, () => {
            this.buttonAttr();
          });
        }
        else if(b === "d") {
          this.setState({
            set: false,
            pickup: this.state.pickup,
            destination: this.state.destination
          }, () => {
            this.buttonAttr();
          });
        }
      }

    handleButton(b) {
        if(b === "p") {
            this.setState({
                pickup: ' ',
            });
        }
        else if(b === "d") {
            this.setState({
                destination: ''
            });
        }
    }

    buttonAttr() {
        if(this.state.pickup.trim().length === 0 || this.state.destination.trim().length === 0)
            return {
                disabled: 'true'
            };
    }

    proceed() {
        console.log("Done");
    }
    render() {
        const { mapApiLoaded, mapInstance, mapApi } = this.state;
        return(
            <div>
                <table style={{ height: '100vh', width: '100%' }}>
                    <tr>
                        <td style={{ height: '100vh', width: '60%' }}>
                            <Map
                                Mkey="AIzaSyAGz6Z8U8Y7jlT9abxQzDDlIHscbNn1cjI"
                                libraries={['places', 'geometry']}
                                MapApi={this.setMapApi}
                                MapInstance={this.setMapInstance}
                                place={this.state.place}
                                address={this.address}
                                setApi={this.setApi}
                            />
                        </td>
                        <td style={{height: '100vh'}}>
                            <Container>
                            {mapApiLoaded && (
                                <div>
                                    <h2>Book For Intercity!</h2>
                                    <br />
                                    <h4>Pickup Location</h4>
                                    <Address key={this.state.pickup} address={this.state.pickup} map={mapInstance} mapApi={mapApi} addplace={this.addPlace} identity="p" bar={this.setBar} isempty={this.handleButton} />
                                    <br />
                                    <h4>Destination Location</h4>
                                    <Address key={this.state.destination} address={this.state.destination} map={mapInstance} mapApi={mapApi} addplace={this.addPlace} identity="d" bar={this.setBar} isempty={this.handleButton} />
                                    <br /><br /><br />
                                    <Button variant="contained" color="primary" {...this.buttonAttr()} onClick={this.proceed()}>Book</Button>
                                    <br /><br />
                                    <p><strong>Note:</strong> Double click on the location on map to get the address in address bar.</p>
                                </div>
                            )}
                            </Container>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
};

export default IntraCity;