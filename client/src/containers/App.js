import React, { Component } from 'react';

import Header from '../components/Header';
import Searchbar from '../containers/Searchbar';
import OreoList from '../containers/OreoList';
import Filter from '../containers/Filter';
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
