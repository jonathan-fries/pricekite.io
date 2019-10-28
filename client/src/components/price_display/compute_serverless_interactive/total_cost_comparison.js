import React from 'react';
import Table from 'react-bootstrap/Table';

export default class TotalCostComparison extends React.Component{

  constructor(props){
        super(props);
      }

      render(){

        const gcpTotalCost = this.props.gcpTotalCost;
        const awsTotalCost = this.props.awsTotalCost;
        const azureTotalCost = this.props.azureTotalCost;

        return <Table striped bordered hover responsive="sm">
          <tbody>
            <tr>
              <td>GCP</td>
              <td>${gcpTotalCost.toFixed(2)}</td>
            </tr>
            <tr>
              <td>AWS</td>
              <td>${awsTotalCost.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Azure</td>
              <td>${azureTotalCost.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>;
      }

}
