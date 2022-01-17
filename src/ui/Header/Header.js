import React, {Component} from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Button, IconButton } from "@material-ui/core";
import {SignUp} from '../../SignUp/SignUp';

export class Header extends Component {
    constructor() {
        super();
    }

    render() {
        return (
          <AppBar>
            <Toolbar>
              <img width="200px" height="100px"  src="./logo.png" class="logo" />
              <IconButton><Typography>Sign Up</Typography></IconButton>
              <IconButton><Typography>Login</Typography></IconButton>
            </Toolbar>
          </AppBar>
        );
    }
}

export default Header;