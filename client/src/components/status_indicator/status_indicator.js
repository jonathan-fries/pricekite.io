import React from 'react';
import Table from 'react-bootstrap/Table';
import './status_indicator.scss'
import { Wave } from 'react-animated-text';

//import { Wave } from 'react-animated-text';

export default class StatusIndicator extends React.Component{

  constructor(props){
        super(props);

        this.state = { gcpState: {gcp_loading: true, gcp_alive: false }, awsState:{aws_loading:true, aws_alive: false}, azure_state:{azure_loading: true, azure_alive: false} };

      }

  render(){
    return <Table striped bordered hover responsive="sm">
      <thead>
        <tr>
          <th className='statusHeaderColumn'>Google</th>
          <th className='statusHeaderColumn'>AWS</th>
          <th className='statusHeaderColumn'>Azure</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Wave text="......" effect="fadeOut"/></td>
          <td><Wave text="......" effect="fadeOut"/></td>
          <td><Wave text="......" effect="fadeOut"/></td>
        </tr>
      </tbody>
    </Table>
  }
}
