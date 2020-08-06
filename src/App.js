import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import "./App.css";
import Login from "./pages/Login";
import ValidatedRegisterForm from "./pages/Register";

class App extends Component {
  render(){  
    
    return (
      <BrowserRouter> 
        <Switch>
    
      
          <Route path='/Register' exact><ValidatedRegisterForm/></Route>
          <Route path='/Login' exact><Login/></Route>
          <Redirect to="/" />
        </Switch>
     
      </BrowserRouter>
  
  
  )
  }

}

export default App;
