import { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { requestJSONData } from './../../request/data';
import { Load } from './Load';
import './Truck.css';
import Categories from './Categories';

export class Truck extends Component {    
    constructor() {
        super();
        this.state = {
            form: {
                loads: [],
                truck: ''
            },
            data: {
                trucks: ['Nothing to show']
            },
        };
    }

    async componentDidMount() {
        this.setState({
            data: {
                trucks: await requestJSONData("trucks")
            }
        });
    }

    updateState = (e) => {
        var t = e.target;
        if(t.value.trim().length === 0) {
            var dumb = {...this.state};
            dumb.form[t.name] = '';
            this.setState(dumb, () => {
                this.buttonAttr();
            });
        }
        var dumb1 = {...this.state};
        dumb1.form[t.name] = t.value;
        this.setState(dumb1, () => {
            console.log(this.state);
        });
    }

    isValidTruck = (value) => {
        for(let i = 0; i < this.state.data.trucks.length; ++i)
            if(this.state.data.trucks[i]['name'] === value)
                return true;
        return false;
    }

    handleTag = ({ target }, fieldName) => {
        let cont = false;
        const { value } = target;
        cont = this.isValidTruck(value.trim());
        if(cont) {
            var dumb = {...this.state};
            dumb.form[fieldName] = value;
            this.setState(dumb, async() => {
                this.buttonAttr();
            });
        }
    }

    getTrucks = () => {
        return this.state.data.trucks;
    }

    isEmptyState = () => {
        for(let c in this.state.form) {
            console.log(this.state.form[c]);
            if(typeof this.state.form[c] === 'string' || this.state.form[c] instanceof String)
                if(this.state.form[c].trim() === '')
                    return true;
        }
        return false;
    }
    
    buttonAttr = () => {
        if(this.isEmptyState() === true) {
            return {disabled: true};
        }
    }

    render() {
        return (
            <div id="main">
                <Load />
                <br />
                <Categories />
                <br />
                <Autocomplete
                    id="truck"
                    onSelect={(event) => this.handleTag(event, 'truck')}
                    options={this.getTrucks()}
                    getOptionLabel={(option) => option.name.toString()}
                    getOptionSelected={(option, value) => option === value}
                    renderInput={
                        (params) => <TextField {...params} onBlur={this.buttonAttr} name="truck" label="Truck" onChange={this.updateState} />
                    }
                />
                <br /><br />
                <Button {...this.buttonAttr()} variant="contained" color="primary">Next</Button>
            </div>
        );
    }
};

export default Truck;