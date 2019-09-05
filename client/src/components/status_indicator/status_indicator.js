import React from 'react';
import Table from 'react-bootstrap/Table';
import './status_indicator.scss'
//import { Wave } from 'react-animated-text';

export default class StatusIndicator extends React.Component{

  constructor(props){
        super(props);
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
          <td>Alive</td>
          <td>Alive</td>
          <td>Alive</td>
        </tr>
      </tbody>
    </Table>
  }
}
