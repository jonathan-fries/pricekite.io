import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

//import { Wave } from 'react-animated-text';

export default class ServerlessButton extends React.Component{

  constructor(props){
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
      }

      handleSelect(evt) {
        // what am I suppose to write in there to get the value?
        console.log(evt)
      }

    render(){
        return <DropdownButton id="dropdown-basic-button" title="Select Region" onSelect={this.handleSelect} >
                  <Dropdown.Item href="#1000">US East 1</Dropdown.Item>
                  <Dropdown.Item href="#1002">US East 2</Dropdown.Item>
                  <Dropdown.Item href="#1001">US West 1</Dropdown.Item>
                  <Dropdown.Item href="#1003">US West 2</Dropdown.Item>
                  <Dropdown.Item href="#1004">US Central 1</Dropdown.Item>
                  <Dropdown.Item href="#2000">Hong Kong 1</Dropdown.Item>
                  <Dropdown.Item href="#2001">Mumbai 1</Dropdown.Item>
                  <Dropdown.Item href="#3002">London 1</Dropdown.Item>
          </DropdownButton>;
    }





}
