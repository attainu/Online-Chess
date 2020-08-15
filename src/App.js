import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GamePage from "./pages/GamePage";
import PasswordResetPage from './pages/PasswordResetPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/game/:gameId" component={GamePage} />

          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/passwordReset" exact component={PasswordResetPage} />
          {/* <Route path='/Home' exact><Home/></Route> */}
          <Redirect to="/" />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
