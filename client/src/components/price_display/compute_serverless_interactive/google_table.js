import React from 'react';
import Table from 'react-bootstrap/Table';
//import '../shared/google_memory_cpu_assignments.js';

//import { Wave } from 'react-animated-text';

export default class GoogleTable extends React.Component{

  constructor(props){
        super(props);

        this.getInvocationRecord = this.getInvocationRecord.bind(this);
        this.getCPURecord = this.getCPURecord.bind(this);
        this.getMemoryRecord = this.getMemoryRecord.bind(this);
        const cpuAssignments = require('../shared/google_memory_cpu_assignments.js');
        this.state = { gcp_cpu_assignments : cpuAssignments }
      }


      render(){
        const regionSelected = this.props.regionSelected;
        const numberOfFunctions = this.props.functionNumber;
        const functionAverageTime = this.props.functionAverageTime;
        const functionMemoryAmount = this.props.functionMemoryAmount;
        const functionInvocations = this.props.functionInvocations;
        const googleData = this.props.googleData;

        const googleInvocations = this.getInvocationRecord(googleData, numberOfFunctions, functionInvocations, 2000000);
        const googleMemory = this.getMemoryRecord(googleData, numberOfFunctions, functionInvocations, functionAverageTime, functionMemoryAmount, 400000);
        const googleCpu = this.getCPURecord(googleData, numberOfFunctions, functionInvocations, functionAverageTime, functionMemoryAmount, 200000);

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
          </tbody>
        </Table>
        </div>;
      }

      getInvocationRecord(googleData, numberOfFunctions, functionInvocations, invocationDiscount){
        var i = 0;
        var invocationRecord = { "name" : "N/A", "pricePerUnit" : 0, "unit" : "N/A", "unitsCharged": 0, "unitsConsumed" : 0, "cost" : 0 };
        for(i; i< googleData.length; i++)
        {
          if(googleData[i].name == "Invocations")
          {
            invocationRecord = googleData[i];
          }
        }

        if(invocationRecord.name != "N/A")
        {
          invocationRecord.unitsConsumed = numberOfFunctions * functionInvocations;
          invocationRecord.unitsCharged = invocationRecord.unitsConsumed - invocationDiscount;
          if(invocationRecord.unitsCharged < 0){invocationRecord.unitsCharged = 0;}
          invocationRecord.cost = invocationRecord.unitsCharged * invocationRecord.pricePerUnit;
        }

        return invocationRecord;
      }

      getCPURecord(googleData, numberOfFunctions, functionInvocations, functionAverageTime, functionMemoryAmount, cpuDiscount){
        var i = 0;
        var cpuRecord = { "name" : "N/A", "pricePerUnit" : 0, "unit" : "N/A", "unitsCharged": 0, "unitsConsumed" : 0, "cost" : 0 };
        for(i; i< googleData.length; i++)
        {
          if(googleData[i].name == "CPU Time")
          {
            cpuRecord = googleData[i];
          }
        }

        if(cpuRecord.name != "N/A")
        {
          var cpuFraction = (this.state.gcp_cpu_assignments[functionMemoryAmount].cpu)/1000;

          cpuRecord.unitsConsumed = (cpuFraction * ((functionInvocations * functionAverageTime)/1000)) * numberOfFunctions;
          cpuRecord.unitsCharged = cpuRecord.unitsConsumed - cpuDiscount;
          if(cpuRecord.unitsCharged < 0){cpuRecord.unitsCharged = 0};
          cpuRecord.cost = cpuRecord.unitsCharged * cpuRecord.pricePerUnit;
        }

        return cpuRecord;
      }

      getMemoryRecord(googleData, numberOfFunctions, functionInvocations, functionAverageTime, functionMemoryAmount, memoryDiscount){
        var i = 0;
        var memoryRecord = { "name" : "N/A", "pricePerUnit" : 0, "unit" : "N/A", "unitsCharged": 0, "unitsConsumed" : 0, "cost" : 0 };
        for(i; i< googleData.length; i++)
        {
          if(googleData[i].name == "Memory Time")
          {
            memoryRecord = googleData[i];
          }
        }

        if(memoryRecord.name != "N/A")
        {
          var memoryFraction = functionMemoryAmount/1024;
          memoryRecord.unitsConsumed = (memoryFraction * ((functionInvocations * functionAverageTime)/1000)) * numberOfFunctions;
          memoryRecord.unitsCharged = memoryRecord.unitsConsumed - memoryDiscount;
          if(memoryRecord.unitsCharged < 0){memoryRecord.unitsCharged = 0};
          memoryRecord.cost = memoryRecord.unitsCharged * memoryRecord.pricePerUnit;
        }

        return memoryRecord;
      }

}
