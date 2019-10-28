import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './button.scss'

//import { Wave } from 'react-animated-text';

export default class NumInvocationButton extends React.Component{

  constructor(props){
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
      }

      handleSelect(key, evt) {

        this.props.OnChangeDone(key, evt);
        console.log(evt);

      }

    render(){
        return <DropdownButton id="dropdown-run-time-button" title="Invocations/Month" className="buttonPadding" onSelect={this.handleSelect} >
                  <Dropdown.Item value="100000">100,000</Dropdown.Item>
                  <Dropdown.Item value="500000">500,000</Dropdown.Item>
                  <Dropdown.Item value="1000000">1 million</Dropdown.Item>
                  <Dropdown.Item value="5000000">5 million</Dropdown.Item>
                  <Dropdown.Item value="10000000">10 million</Dropdown.Item>
                  <Dropdown.Item value="12960000">12,960,000</Dropdown.Item>
                  <Dropdown.Item value="25000000">25 million</Dropdown.Item>
                  <Dropdown.Item value="50000000">50 million</Dropdown.Item>
                  <Dropdown.Item value="100000000">100 million</Dropdown.Item>
          </DropdownButton>;
    }
}
