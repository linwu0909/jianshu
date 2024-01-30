import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./common/header";

class App extends Component {
  render() {
    return (
      // <Provider>
      //   <BrowserRouter>
      //     <div>Hello World</div>
      //   </BrowserRouter>
      // </Provider>
      <Header />
    );
  }
}

export default App;
