import { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { requestData } from './../../request/data';
import './TruckAssign.css';

export class TruckAssign extends Component {
    constructor() {
        super();

        this.state = {
            form: {
                truck: '',
                route: ''
            },
            data: {
                routes: ['Nothing to show'],
            }
        };
    }

    async componentDidMount() {
        this.setState({
            data: {
                routes: await requestData("routes")
            }
        });
    }

    getRoutes = () => {
        var routes = [];
        for(let a = 0; a < this.state.data.routes.length; ++a) {
            let cur = this.state.data.routes[a];
            routes.push({key: cur['ID'], label: cur['pickup'] + " - " + cur['destination'] + " at " + cur['date'] + " " + cur['time']});
        }
        return routes;
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
        if(name === "route") {
            cont = this.getRoutes().includes(value.trim());
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
        if(this.state.form.route.length === 0 || this.state.form.truck.trim().length === 0)
            return {
                disabled: true
            };
    }

    handleTag = ({ target }, fieldName) => {
        let cont = false;
        const { value } = target;
        cont = this.getRoutes().includes(value.trim());
        if(cont) {
            this.setState({[fieldName]: value}, () => {
                this.buttonAttr();
            });
        }
    }

    render() {
        return(
            <div>
                <Autocomplete
                id="route"
                onSelect={(event) => this.handleTag(event, 'route')}
                options={this.getRoutes()}
                getOptionSelected={(option, value) => option.label === value}
                renderInput={
                    (params) => <TextField {...params} onBlur={this.buttonAttr} name="route" label="Route" onChange={this.updateState} />
                } 
                />
                <br /><br />
                <TextField name="truck" label="Truck" onChange={this.updateState} value={this.state.form.truck} />
                <br /><br />
                <Button {...this.buttonAttr()} variant="contained" color="primary">Next</Button>
            </div>
        );
    }
};

export default TruckAssign;