import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

//import { Wave } from 'react-animated-text';

export default class ServerlessButton extends React.Component{

  constructor(props){
        super(props);


      }

    render(){
        return <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                  <Dropdown.Item href="#/action-1">US East 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">US East 2</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">US West 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">US West 2</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">US Central 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-1">Hong Kong 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Mumbai 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">London 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Frankfurt 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">US Central 1</Dropdown.Item>
          </DropdownButton>;
    }





}
