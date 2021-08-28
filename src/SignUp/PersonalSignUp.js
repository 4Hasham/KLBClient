import './PersonalSignUp.css';
import React, {Component} from 'react';
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@material-ui/core'
import { Container, TextField } from '@material-ui/core';
import { validateName, validateDate } from '../utils/Validation';

export class PersonalSignUp extends Component {

  constructor() {
    super();

    this.state = {
      fname: "",
      lname: "",
      gender: "",
      dob: "",
      errors: {
        fname: "",
        lname: "",
        gender: "",
        dob: ""
      }
    };

    this.setValues = this.setValues.bind(this);
  }

  componentWillMount() {
    //in case there are previous values coming from parent

    let prevData = this.props.sendData;
    for(let a in prevData) {
      this.setState({[a]: prevData[a]});
    }
  }

  setValues(e) {
  
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({[name]: value}, () => {
      this.validateForm(name);
      console.log(this.state);
      if(this.checkOnlyUnempty())
        this.props.setCompleted(1);
      else
        this.props.setCompleted(0);
      console.log("PERSONAL DATA", this.props.sendData);
    });
  }

  validateFname() {
    if(validateName(this.state.fname) < 0)
      this.state.errors.fname = "First name cannot be greater than 14 characters and smaller than 2 characters.";
    else if(validateName(this.state.fname) > 0)
      this.state.errors.fname = "Enter one name.";
    else {
      this.state.errors.fname = "";
      return true;
    }
    return false;
  }

  validateLname() {
    if(validateName(this.state.lname) < 0)
      this.state.errors.lname = "Last name cannot be greater than 14 characters and smaller than 2 characters.";
    else if(validateName(this.state.lname) > 0)
      this.state.errors.lname = "Enter one name.";
    else {
      this.state.errors.lname = "";
      return true;
    }
    return false;
  }

  validateGender() {
    if(validateName(this.state.gender) != 0) {
      this.state.errors.gender = "Please select your gender.";
      return false;
    }
    else {
      this.state.errors.gender = "";
      return true;
    }
  }

  validateDOB() {
    if(!validateDate(this.state.dob)) {
      this.state.errors.dob = "Not a valid date, please select a valid date with the format mm-dd-yyyy.";
      return false;
    }
    else {
      this.state.errors.dob = "";
      return true;
    }
  }

  validateForm(field) {
    switch(field) {
      case 'fname':
        this.validateFname();
      break;
      case 'lname':
        this.validateLname();
      break;
      case 'gender':
        this.validateGender();
      break;
      case 'dob':
        this.validateDOB();
      break;
      default:
        return (
          this.validateFname() &&
          this.validateLname() &&
          this.validateGender() &&
          this.validateDOB()
        );
    }
  }

  errorAttr(field) {
    if(this.state.errors[field] != "")
      return {
        error: `true`,
        helperText: this.state.errors[field]
      };
  }

  componentWillUnmount() {
    this.props.setData(this.state);
    if(this.checkOnlyUnempty())
      this.props.setCompleted(1);
    else
      this.props.setCompleted(0);
  }
  
  checkBool(arr) {
    let b = true;
    for(let i in arr) {
      b = b && this.validateForm(i);
    }
    return b;
  }

  checkOnlyUnempty() {
    let total = Object.keys(this.state).length;
    let field_arr = [];
    for(let s in this.state)
      if(this.state[s] != '')
        field_arr.push(s);

    if(field_arr.length == total && this.checkBool(field_arr))
      return true;
    else
      return false;
  }

  render() {
    return (
      <Container>
          <br />
          <h2>Personal Information</h2>
          <form id="custForm" name="custForm" className="custForm" noValidate autoComplete="false">
            <TextField {... this.errorAttr('fname')} name="fname" label="First Name" value={this.state.fname} onChange={this.setValues} />&nbsp;&nbsp;
            <TextField {... this.errorAttr('lname')} name="lname" label="Last Name" value={this.state.lname} onChange={this.setValues} />
            <br /><br />
            <TextField {... this.errorAttr('dob')} type="date" name="dob" label="Date of Birth" InputLabelProps={{shrink: true}} value={this.state.dob} onChange={this.setValues} />
            <br /><br />
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup {... this.errorAttr('gender')} aria-label="gender" name="gender" value={this.state.gender} onChange={this.setValues}>
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
            <br /><br />
          </form><br /><br />
      </Container>
    );
  }  
}

export default PersonalSignUp;