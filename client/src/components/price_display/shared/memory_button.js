import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './button.scss'

//import { Wave } from 'react-animated-text';

export default class MemoryButton extends React.Component{

  constructor(props){
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
      }

      handleSelect(key, evt) {

        this.props.OnChangeDone(key, evt);
        console.log(evt);

      }

    render(){
        return <DropdownButton id="dropdown-memory-button" title="Memory Amount" className="buttonPadding" onSelect={this.handleSelect} >
                  <Dropdown.Item value="128">128 MB</Dropdown.Item>
                  <Dropdown.Item value="256">256 MB</Dropdown.Item>
                  <Dropdown.Item value="512">512 MB</Dropdown.Item>
                  <Dropdown.Item value="1024">1024 MB</Dropdown.Item>
                  <Dropdown.Item value="2048">2048 MB</Dropdown.Item>
          </DropdownButton>;
    }
}
