import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Login from "./pages/Login";
import ValidatedRegisterForm from "./pages/Register";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GamePage from './pages/GamePage'
import ProfilePage from './pages/ProfilePage'
import MessagesPage from './pages/MessagesPage'

class App extends Component {
  render(){  
    
    return (
      <BrowserRouter  > 
        <Header />
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path='/game' component={GamePage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/Messages" component={MessagesPage} />
      
          <Route path='/Register' exact><ValidatedRegisterForm/></Route>
          <Route path='/Login' exact><Login/></Route>       
          <Redirect to="/" />
        </Switch>
        <Footer />
     
      </BrowserRouter>
  
  
  )
  }
}











export default App;
