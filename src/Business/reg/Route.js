import { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Route.css';
import * as cities from '../../utils/cities.json';

var hours = [
    '00', '01' , '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
    '13' , '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
];
var mins = ['00', '15', '30', '45'];
export class Route extends Component {
    constructor() {
        super();
        this.state = {
            pickup: '',
            destination: '',
            timeH: '',
            timeM: ''
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
        else if(name === "timeH") {
            cont = hours.includes(value.trim());
        }
        else if(name === "timeM") {
            cont = mins.includes(value.trim());
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
        if(this.state.pickup.trim().length === 0 || this.state.destination.trim().length === 0 || this.state.timeH.trim().length === 0 || this.state.timeM.trim().length === 0)
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
        else if(fieldName === "timeH") {
            cont = hours.includes(value.trim());
        }
        else if(fieldName === "timeM") {
            cont = mins.includes(value.trim());
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
                        <td>
                            <Autocomplete
                            id="timeH"
                            onSelect={(event) => this.handleTag(event, 'timeH')}
                            options={hours}
                            getOptionSelected={(option, value) => option === value}
                            renderInput={
                                (params) => <TextField {...params} onBlur={this.buttonAttr} name="timeH" label="Hours" onChange={this.updateState} />
                            }
                            />
                        </td>
                        <td>
                            <Autocomplete
                            id="timeM"
                            onSelect={(event) => this.handleTag(event, 'timeM')}
                            options={mins}
                            getOptionSelected={(option, value) => option === value}
                            renderInput={
                                (params) => <TextField {...params} onBlur={this.buttonAttr} name="timeM" label="Minutes" onChange={this.updateState} />
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

export default Route;