import React, { Component } from 'react';

import Header from '../components/Header';
import Searchbar from '../containers/Searchbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Searchbar />
      </div>
    );
  }
}

export default App;
