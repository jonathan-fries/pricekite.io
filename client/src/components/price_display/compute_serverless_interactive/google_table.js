import React from 'react';
import Table from 'react-bootstrap/Table';
//import '../shared/google_memory_cpu_assignments.js';

//import { Wave } from 'react-animated-text';

export default class GoogleTable extends React.Component{

  constructor(props){
        super(props);

      }

      render(){

        const googleInvocations = this.props.googleInvocationRecord;
        const googleMemory = this.props.googleMemoryRecord;
        const googleCpu = this.props.googleCpuRecord;
        const totalMonthly = this.props.totalMonthly;

        return <div >
        <h2>Google</h2>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <td>GCP Item</td>
              <td>Rate Per Unit</td>
              <td>Unit</td>
              <td>Units Consumed</td>
              <td>Units Charged</td>
              <td>Cost</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{googleInvocations.name}</td>
              <td>${googleInvocations.pricePerUnit != 0.00 ? (googleInvocations.pricePerUnit).toFixed(8) : "--"}</td>
              <td>{googleInvocations.unit}</td>
              <td>{googleInvocations.name != "N/A" ? googleInvocations.unitsConsumed.toLocaleString('en') : "--"}</td>
              <td>{googleInvocations.name != "N/A" ? googleInvocations.unitsCharged.toLocaleString('en') : "--"}</td>
              <td>${googleInvocations.name != "N/A" ? googleInvocations.cost.toFixed(2) : "--"}</td>
            </tr>
            <tr>
              <td>{googleMemory.name}</td>
              <td>${googleMemory.pricePerUnit != 0.00 ? (googleMemory.pricePerUnit).toFixed(8) : "--"}</td>
              <td>{googleMemory.unit}</td>
              <td>{googleMemory.name != "N/A" ? googleMemory.unitsConsumed.toLocaleString('en') : "--"}</td>
              <td>{googleMemory.name != "N/A" ? googleMemory.unitsCharged.toLocaleString('en') : "--"}</td>
              <td>${googleMemory.name != "N/A" ? googleMemory.cost.toFixed(2) : "--"}</td>
            </tr>
            <tr>
              <td>{googleCpu.name}</td>
              <td>${googleCpu.pricePerUnit != 0.00 ? (googleCpu.pricePerUnit).toFixed(8) : "--"}</td>
              <td>{googleCpu.unit}</td>
              <td>{googleCpu.name != "N/A" ? googleCpu.unitsConsumed.toLocaleString('en') : "--"}</td>
              <td>{googleCpu.name != "N/A" ? googleCpu.unitsCharged.toLocaleString('en') : "--"}</td>
              <td>${googleCpu.name != "N/A" ? googleCpu.cost.toFixed(2) : "--"}</td>
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
