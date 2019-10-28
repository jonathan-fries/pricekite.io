import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './button.scss'

//import { Wave } from 'react-animated-text';

export default class RunTimeButton extends React.Component{

  constructor(props){
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
      }

      handleSelect(key, evt) {

        this.props.OnChangeDone(key, evt);
        console.log(evt);

      }

    render(){
        return <DropdownButton id="dropdown-run-time-button" title="Avg. Run Time" className="buttonPadding" onSelect={this.handleSelect} >
                  <Dropdown.Item value="20">25 ms</Dropdown.Item>
                  <Dropdown.Item value="50">50 ms</Dropdown.Item>
                  <Dropdown.Item value="100">100 ms</Dropdown.Item>
                  <Dropdown.Item value="200">200 ms</Dropdown.Item>
                  <Dropdown.Item value="250">250 ms</Dropdown.Item>
                  <Dropdown.Item value="500">500 ms</Dropdown.Item>
                  <Dropdown.Item value="750">750 ms</Dropdown.Item>
                  <Dropdown.Item value="1000">1 sec</Dropdown.Item>
                  <Dropdown.Item value="2000">2 sec</Dropdown.Item>
                  <Dropdown.Item value="4000">4 sec</Dropdown.Item>
                  <Dropdown.Item value="10000">10 sec</Dropdown.Item>
          </DropdownButton>;
    }
}
