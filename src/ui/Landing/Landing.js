import './Landing.css';
import React, {Component} from 'react';
import { Header } from '../Header/Header';

export class Landing extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Header></Header>
    );
  }
}

export default Landing;