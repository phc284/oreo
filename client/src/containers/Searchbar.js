import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

class Searchbar extends Component {
  render() {
    return (
      <InputGroup className="searchbar" size="lg">
        <Input />
        <InputGroupAddon addonType="append">
          <Button>
            <i class="material-icons">search</i>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

export default Searchbar;
