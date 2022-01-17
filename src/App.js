import React from 'react';
import { SignUp } from './SignUp/SignUp';
import { CustomerLogin } from './Login/CustomerLogin';
import { TruckReg } from './Business/reg/TruckReg';
import { Route } from './Business/reg/Route';
import { Truck } from './Business/book/Truck';
import { InterCity } from './Business/book/InterCity';
import { IntraCity } from './Business/book/IntraCity';

import './App.css';

function App() {
  return (
      <IntraCity />
  );
}

export default App;