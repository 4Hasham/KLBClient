import { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { validatePhone, validatePassword } from '../utils/Validation';
import './DriverLogin.css';

export class DriverLogin extends Component {
    constructor() {
        super();

        this.state = {
            form: {
                phone: '',
                pass: ''
            },
            error: {
                phone: '',
                pass: ''
            }
            ,
            valid: false
        };
    }

    sendInfo = async() => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.form)
      };
      let str = new Promise((resolve, reject) => {
        fetch("drivers/login", requestOptions).then((res) => {
          resolve(res.json());
        });
      });
      console.log(await str);
    }  

    updateState = (e) => {
        var t = e.target;
        var d = {...this.state};
        d.form[t.name] = t.value; 
        this.setState(d, this.validateForm(t.name));
        if(!this.checkBool(['phone', 'pass']))
            d.valid = false;
        else
            d.valid = true;
        this.setState(d)
    }

    isEmptyState = () => {
        for(let c in this.state.form) {
            if(typeof this.state.form[c] === 'string' || this.state.form[c] instanceof String)
                if(this.state.form[c].trim() === '')
                    return true;
        }
        return false;
    }

    errorAttr(field) {
        if(this.state.error[field] !== "")
        return {
            error: true,
            helperText: this.state.error[field]
        };
    }

    _validatephone() {
        var s = {...this.state};
        if(!validatePhone(this.state.form.phone)) {
          s.error.phone = "Please enter a valid phone address.";
          this.setState(s);
          return false;
        }
        else {
          s.error.phone = "";
          this.setState(s);
          return true;
        }
      }
    
      _validatePass() {
        var s = {...this.state};
        if(!validatePassword(this.state.form.pass)) {
          s.error.pass = "You password must comprise of at least 7 characters, and it must have at least one number and special character.";
          this.setState(s);
          return false;
        }
        else {
          s.error.pass = "";
          this.setState(s);
          return true;
        }
      }

    validateForm(field) {
        switch(field) {
          case 'phone':
            this._validatephone();
          break;
          case 'pass':
            this._validatePass();
          break;
          default:
            return (
                this._validatephone() &&
                this._validatePass()
            );
        }
    }

    buttonAttr = () => {
        if(!this.state.valid) {
            return {disabled: true};
        }
    }

    checkBool = (arr) => {
        let b = true;
        for(let i in arr) {
          b = b && this.validateForm(i);
        }
        return b;
    }
    
    checkOnlyUnempty = () => {
        let total = Object.keys(this.state.form).length;
        let field_arr = [];
        for(let s in this.state.form)
          if(this.state.form[s] !== '')
            field_arr.push(s);
    
        if(field_arr.length === total && this.checkBool(field_arr))
          return true;
        else
          return false;
    }

    render() {
        return(
            <div>
                <TextField {... this.errorAttr('phone')} name="phone" value={this.state.form.phone} label="Phone" type="text" onChange={this.updateState} /><br />
                <br />
                <TextField {... this.errorAttr('pass')} name="pass" value={this.state.form.pass} label="Password" type="password" onChange={this.updateState} /><br />
                <br />
                <Button {...this.buttonAttr()} onClick={this.sendInfo} variant="contained" color="primary">Login</Button>
            </div>
        );
    }
};

export default DriverLogin;