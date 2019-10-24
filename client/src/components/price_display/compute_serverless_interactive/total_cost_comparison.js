import React from 'react';
import Table from 'react-bootstrap/Table';

export default class TotalCostComparison extends React.Component{

  constructor(props){
        super(props);
      }

      render(){
        return <Table striped bordered hover responsive="sm">
          <tr>
            <td>GCP</td>
            <td>$14.00</td>
          </tr>
          <tr>
            <td>AWS</td>
            <td>$14.00</td>
          </tr>
          <tr>
            <td>Azr</td>
            <td>$14.00</td>
          </tr>
        </Table>;
      }

}
