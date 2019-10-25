import React from 'react';
import Table from 'react-bootstrap/Table';

export default class AWSTable extends React.Component{

  constructor(props){
        super(props);
      }

      render(){

        const awsInvocations = this.props.awsInvocationRecord;
        const awsMemory = this.props.awsMemoryRecord;
        //const googleCpu = this.props.googleCpuRecord;
        const totalMonthly = this.props.totalMonthly;

        return <div >
        <h2>AWS</h2>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <td>AWS Item</td>
              <td>Rate Per Unit</td>
              <td>Unit</td>
              <td>Units Consumed</td>
              <td>Units Charged</td>
              <td>Cost</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{awsInvocations.name}</td>
              <td>${awsInvocations.pricePerUnit != 0.00 ? (awsInvocations.pricePerUnit).toFixed(8) : "--"}</td>
              <td>{awsInvocations.unit}</td>
              <td>{awsInvocations.name != "N/A" ? awsInvocations.unitsConsumed.toLocaleString('en') : "--"}</td>
              <td>{awsInvocations.name != "N/A" ? awsInvocations.unitsCharged.toLocaleString('en') : "--"}</td>
              <td>${awsInvocations.name != "N/A" ? awsInvocations.cost.toFixed(2) : "--"}</td>
            </tr>
            <tr>
              <td>{awsMemory.name}</td>
              <td>${awsMemory.pricePerUnit != 0.00 ? (awsMemory.pricePerUnit).toFixed(8) : "--"}</td>
              <td>{awsMemory.unit}</td>
              <td>{awsMemory.name != "N/A" ? awsMemory.unitsConsumed.toLocaleString('en') : "--"}</td>
              <td>{awsMemory.name != "N/A" ? awsMemory.unitsCharged.toLocaleString('en') : "--"}</td>
              <td>${awsMemory.name != "N/A" ? awsMemory.cost.toFixed(2) : "--"}</td>
            </tr>
            <tr>
              <td><b>Total</b></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>${totalMonthly.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
        </div>;
      }
}
