import './SignUp.css';
import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Button } from '@material-ui/core';
import { TabPanel } from '../ui/TabPanel';
import { PersonalSignUp } from './PersonalSignUp';
import { CustomerInfoSignUp } from './CustomerInfoSignUp';
import { DriverInfoSignUp } from './DriverInfoSignUp';

export class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      value: 0,
      personalCompleted: 0,
      personalData: null,
      accountCompleted: 0,
      accountData: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setCompletedPersonal = this.setCompletedPersonal.bind(this);
    this.setDataPersonal = this.setDataPersonal.bind(this);
    this.setCompletedAccount = this.setCompletedAccount.bind(this);
    this.setDataAccount = this.setDataAccount.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  sendInfo() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personal: this.state.personalData,
        account: this.state.accountData
      })
    };
    fetch("api/signUp", requestOptions);
  }

  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }  

  signUpButton() {
    if(this.state.accountCompleted === 0 || this.state.personalCompleted === 0)
      return {
        disabled: 'true'
      };
  }

  handleChange(e) {
    console.log(e.target.offsetParent.id.split('-')[2]);
    var tar = e.target;
    var val = parseInt(tar.offsetParent.id.split('-')[2]);
    this.setState({value: val});
  }

  setCompletedPersonal(val) {
    this.setState({personalCompleted: val});
  }

  setDataPersonal(val) {
    this.setState({personalData: val});
  }

  setCompletedAccount(val) {
    this.setState({accountCompleted: val});
  }

  setDataAccount(val) {
    this.setState({accountData: val});
  }


  changeTab() {
    if(this.state.value === 0)
      this.setState({value: 1});
    else
      this.setState({value: 0});
  }

  render() {
    return (
      <div>
        <AppBar>
            <Tabs value={this.state.value} onChange={this.handleChange}>
                <Tab label="Personal Info" {...this.a11yProps(0)}></Tab>
                <Tab label="Account Info" {...this.a11yProps(1)}></Tab>
            </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <PersonalSignUp setCompleted={this.setCompletedPersonal} sendData={this.state.personalData} setData={this.setDataPersonal} />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <CustomerInfoSignUp setCompleted={this.setCompletedAccount} sendData={this.state.accountData} setData={this.setDataAccount} />
          {/* <DriverInfoSignUp /> */}
        </TabPanel>
        <br /><br />
        <div id="button_group">
          <Button variant="contained" color="primary" onClick={this.changeTab}>Next</Button>&nbsp;
          <Button variant="contained" color="primary" {...this.signUpButton()} onClick={this.sendInfo()} >Save</Button>
        </div>
      </div>
    );
  }
}

export default SignUp;