import React from "react";
import Header from "../containers/Header";
import Searchbar from "../containers/Searchbar";
import OreoList from "../containers/OreoList";
import Filter from "../containers/Filter";
import Footer from "./Footer";

const Homepage = props => {
  return (
    <div className="App">
      <Header page={true} />
      <Searchbar history={props.history} />
      <OreoList />
      <Filter />
      <Footer />
    </div>
  );
};

export default Homepage;
