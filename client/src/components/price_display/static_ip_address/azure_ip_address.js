import React from 'react';
import Table from 'react-bootstrap/Table';
import './column_styles.scss'

export default class AzureIpAddress extends React.Component{

  render(){
    return <Table striped bordered hover responsive="sm">
      <thead>
        <tr>
          <th className='headerColumn'>Item</th>
          <th>Monthly</th>
          <th>SKU</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>ASM First 5:</td>
        <td>$0/month</td>
        <td></td>
      </tr>
      <tr>
        <td>ASM Additional:</td>
        <td>$2.59/month</td>
        <td></td>
      </tr>
      <tr>
        <td>Basic ARM First 5:</td>
        <td>$2.88/month</td>
        <td></td>
      </tr>
      <tr>
        <td>Basic ARM Additional:</td>
        <td>$5.76/month</td>
        <td></td>
      </tr>
      <tr>
        <td>Standard ARM All:</td>
        <td>$3.60/month</td>
        <td></td>
      </tr>
      </tbody>
    </Table>;
  }

}
