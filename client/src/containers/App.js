import React, { Component } from 'react';

import Header from './Header';
import Searchbar from './Searchbar';
import OreoList from './OreoList';
import Filter from './Filter';
import Footer from '../components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Searchbar />
        <OreoList />
        <Filter />
        <Footer />
      </div>
    );
  }
}

export default App;
