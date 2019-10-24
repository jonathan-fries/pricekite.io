import React from 'react';
import Table from 'react-bootstrap/Table';

//import { Wave } from 'react-animated-text';

export default class GoogleTable extends React.Component{

  constructor(props){
        super(props);

        this.getInvocationRecord = this.getInvocationRecord.bind(this);
        this.getCPURecord = this.getCPURecord.bind(this);
        this.getMemoryRecord = this.getMemoryRecord.bind(this);

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
        const googleCpu = this.getCPURecord(googleData);

        return <div >
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
              <td>{googleInvocations.unitsConsumed.toLocaleString('en')}</td>
              <td>{googleInvocations.unitsCharged.toLocaleString('en')}</td>
              <td>${googleInvocations.cost.toFixed(2)}</td>
            </tr>
            <tr>
              <td>{googleMemory.name}</td>
              <td>${(googleMemory.pricePerUnit).toFixed(8)}</td>
              <td>{googleMemory.unit}</td>
              <td>{googleMemory.unitsConsumed.toLocaleString('en')}</td>
              <td>{googleMemory.unitsCharged.toLocaleString('en')}</td>
              <td>${googleMemory.cost.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
        </div>;
      }

      getInvocationRecord(googleData, numberOfFunctions, functionInvocations, invocationDiscount){
        var i = 0;
        var invocationRecord = { "name" : "N/A", "pricePerUnit" : 0 };
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

      getCPURecord(googleData){
        var i = 0;
        var cpuRecord;
        for(i; i< googleData.length; i++)
        {
          if(googleData[i].name == "CPU Time")
          {
            cpuRecord = googleData[i];
          }
        }
        return cpuRecord;
      }

      getMemoryRecord(googleData, numberOfFunctions, functionInvocations, functionAverageTime, functionMemoryAmount, memoryDiscount){
        var i = 0;
        var memoryRecord = { "name" : "N/A" };
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
