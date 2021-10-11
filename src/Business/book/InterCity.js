import { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './InterCity.css';
import * as cities from '../../utils/cities.json';

var timings = ['Tuesday, 02:00 PM', 'Wedneday, 04:00 PM', 'Thursday, 12:00 AM'];


export class InterCity extends Component {
    
    constructor() {
        super();
        this.state = {
            pickup: '',
            destination: '',
            time: ''
        };
    }

    updateState = (e) => {
        const {name, value} = e.target;
        let prev = this.state[name];
        let cont = false;
        if(value.trim().length === 0) {
            this.setState({
                [name]: ''
            }, () => {
                this.buttonAttr();
            });
            return;
        }
        if(name === "pickup" || name === "destination") {
            cont = cities.default.cities.includes(value.trim());
        }
        else if(name === "time") {
            cont = timings.includes(value.trim());
        }
        if(cont === true) {
            this.setState({
                [name]: value
            }, () => {
                this.buttonAttr();
            });
        }
        else {
            this.setState({
                [name]: prev
            }, () => {
                this.buttonAttr();
            });
        }
        return;
    }

    buttonAttr = () => {
        if(this.state.pickup.trim().length === 0 || this.state.destination.trim().length === 0 || this.state.time.trim().length === 0)
            return {
                disabled: true
            };
    }

    handleTag = ({ target }, fieldName) => {
        let cont = false;
        const { value } = target;
        if(fieldName === "pickup" || fieldName === "destination") {
            cont = cities.default.cities.includes(value.trim());
        }
        else if(fieldName === "time") {
            cont = timings.includes(value.trim());
        }
        if(cont) {
            this.setState({[fieldName]: value}, () => {
                this.buttonAttr();
            });
        }
    }

    render() {
        return(
            <div id="main">
                <table id="main_tab">
                    <tbody>
                    <tr>
                        <td>
                            <Autocomplete
                            id="pickup"
                            onSelect={(event) => this.handleTag(event, 'pickup')}
                            options={cities.default.cities}
                            getOptionSelected={(option, value) => option === value}
                            renderInput={
                                (params) => <TextField {...params} onBlur={this.buttonAttr} name="pickup" label="Pickup" onChange={this.updateState} />
                            } 
                            />
                        </td>
                        <td>
                            <Autocomplete
                            id="destination"
                            onSelect={(event) => this.handleTag(event, 'destination')}
                            options={cities.default.cities}
                            getOptionSelected={(option, value) => option === value}
                            renderInput={
                                (params) => <TextField {...params} onBlur={this.buttonAttr} name="destination" label="Destination" onChange={this.updateState} />
                            }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <Autocomplete
                            id="time"
                            onSelect={(event) => this.handleTag(event, 'time')}
                            options={timings}
                            getOptionSelected={(option, value) => option === value}
                            renderInput={
                                (params) => <TextField {...params} onBlur={this.buttonAttr} name="time" label="Available Rounds" onChange={this.updateState} />
                            }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <Button {...this.buttonAttr()} variant="contained" color="primary">Next</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
};

export default InterCity;