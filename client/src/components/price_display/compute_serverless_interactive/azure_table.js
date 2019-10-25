import React from 'react';
import Table from 'react-bootstrap/Table';

export default class AzureTable extends React.Component{

  constructor(props){
        super(props);
      }

      render(){

        const azureInvocations = this.props.azureInvocationRecord;
        const azureMemory = this.props.azureMemoryRecord;
        //const googleCpu = this.props.googleCpuRecord;
        const totalMonthly = this.props.totalMonthly;

        return <div >
        <h2>Azure</h2>
        <p>Please note that Azure invocation skus prices things in 10's. That is why the number is different.</p>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <td>Azure Item</td>
              <td>Rate Per Unit</td>
              <td>Unit</td>
              <td>Units Consumed</td>
              <td>Units Charged</td>
              <td>Cost</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{azureInvocations.name}</td>
              <td>${azureInvocations.pricePerUnit != 0.00 ? (azureInvocations.pricePerUnit).toFixed(8) : "--"}</td>
              <td>{azureInvocations.unit}</td>
              <td>{azureInvocations.name != "N/A" ? azureInvocations.unitsConsumed.toLocaleString('en') : "--"}</td>
              <td>{azureInvocations.name != "N/A" ? azureInvocations.unitsCharged.toLocaleString('en') : "--"}</td>
              <td>${azureInvocations.name != "N/A" ? azureInvocations.cost.toFixed(2) : "--"}</td>
            </tr>
            <tr>
              <td>{azureMemory.name}</td>
              <td>${azureMemory.pricePerUnit != 0.00 ? (azureMemory.pricePerUnit).toFixed(8) : "--"}</td>
              <td>{azureMemory.unit}</td>
              <td>{azureMemory.name != "N/A" ? azureMemory.unitsConsumed.toLocaleString('en') : "--"}</td>
              <td>{azureMemory.name != "N/A" ? azureMemory.unitsCharged.toLocaleString('en') : "--"}</td>
              <td>${azureMemory.name != "N/A" ? azureMemory.cost.toFixed(2) : "--"}</td>
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
