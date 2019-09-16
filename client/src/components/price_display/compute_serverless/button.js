import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './button.scss'

//import { Wave } from 'react-animated-text';

export default class ServerlessButton extends React.Component{

  constructor(props){
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
      }

      handleSelect(key, evt) {

        this.props.OnChangeDone(key, evt);
        console.log(evt);

      }

    render(){
        return <DropdownButton id="dropdown-basic-button" title="Select Region" onSelect={this.handleSelect} >
                  <Dropdown.Item value="1000">USA East 1</Dropdown.Item>
                  <Dropdown.Item value="1002">USA East 2</Dropdown.Item>
                  <Dropdown.Item value="1001">USA West 1</Dropdown.Item>
                  <Dropdown.Item value="1003">USA West 2</Dropdown.Item>
                  <Dropdown.Item value="2001">Mumbai 1</Dropdown.Item>
                  <Dropdown.Item value="3002">London 1</Dropdown.Item>
          </DropdownButton>;
    }





}
