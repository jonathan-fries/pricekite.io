import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Wave } from 'react-animated-text';
import ServerlessButton from '../shared/button.js';
import MemoryButton from '../shared/memory_button.js';
import RunTimeButton from '../shared/run_time_button.js';
import NumInvocationButton from '../shared/num_invocation_button.js';
import {findRegionRecords} from '../shared/find_region_record.js';
import {findRecordType} from '../shared/find_record_type.js';
import DisplayState from './display_state.js';
import './serverless_main.scss';
import GoogleTable from './google_table.js';
import TotalCostComparison from './total_cost_comparison.js';

//import { Wave } from 'react-animated-text';

export default class ServerlessMain extends React.Component{

  constructor(props){
        super(props);

        const cpuAssignments = require('../shared/google_memory_cpu_assignments.js');

        this.state = { gcp_loading: true,
          gcp_current_price: {},
          gcp_prices: [] ,
          aws_loading:true,
          aws_current_price:{},
          aws_prices: [],
          azure_loading: true,
          azure_current_price:{},
          azure_prices: [],
          function_memory: 128,
          function_invocations: 100000,
          function_average_time: 200,
          function_number: 1,
          function_region_selected: 1000,
          gcp_cpu_assignments : cpuAssignments
          };

        this.handleChange = this.handleChange.bind(this);
        this.handleNumFunctionChange = this.handleNumFunctionChange.bind(this);
        this.handleRunTimeChange = this.handleRunTimeChange.bind(this);
        this.handleInvocationsChange = this.handleInvocationsChange.bind(this);
        this.handleMemoryChange = this.handleMemoryChange.bind(this);

        this.gcpComputedValues = this.gcpComputedValues.bind(this);

        var ws = "https://api.pricekite.io/v1/gcp-compute-serverless-skus";

        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', ws);
        this.xhr.onload = () => {
            if(this.xhr.status === 200){
                console.log(this.xhr.responseText);
                var local_gcp_prices = {};
                local_gcp_prices = JSON.parse(this.xhr.responseText);

                var local_price = findRegionRecords(1000, local_gcp_prices);

                this.setState({gcp_prices:local_gcp_prices});
                this.setState({gcp_current_price:local_price});
                this.setState({gcp_loading: false});
            }
            else{
                console.log("Error calling web service.");
                //this.setState({gcp_alive:'Dead'});
                this.setState({gcp_loading: false});
            }
        };
        this.xhr.send();

        var ws_aws = "https://api.pricekite.io/v1/aws-compute-serverless-skus";

        this.xhr_aws = new XMLHttpRequest();
        this.xhr_aws.open('GET', ws_aws);
        this.xhr_aws.onload = () => {
            if(this.xhr_aws.status === 200){
                console.log(this.xhr_aws.responseText);
                var local_aws_prices = {};
                local_aws_prices = JSON.parse(this.xhr_aws.responseText);
                local_aws_prices = JSON.parse(local_aws_prices.body);

                var local_price = findRegionRecords(1000, local_aws_prices);

                this.setState({aws_current_price:local_price});
                this.setState({aws_prices: local_aws_prices});
                this.setState({aws_loading: false});
            }
            else{
                console.log("Error calling AWS heartbeat service.")
                //this.setState({aws_alive:'Dead'});
                this.setState({aws_loading: false});
            }
        };
        this.xhr_aws.send();


        //var ws_azure = "https://api.pricekite.io/v1/azure-compute-serverless-prices";
        var ws_azure = "https://api.pricekite.io/v1/azure-compute-serverless-skus";

        this.xhr_azure = new XMLHttpRequest();
        this.xhr_azure.open('GET', ws_azure);
        this.xhr_azure.onload = () => {
            if(this.xhr_azure.status === 200){
                console.log(this.xhr_azure.responseText);
                var local_azure_prices = {};
                local_azure_prices = JSON.parse(this.xhr_azure.responseText);
                local_azure_prices = JSON.parse(local_azure_prices.body);
                local_azure_prices = local_azure_prices.Items;

                var local_price = findRegionRecords(1000, local_azure_prices);

                this.setState({azure_prices: local_azure_prices});
                this.setState({azure_current_price:local_price});
                this.setState({azure_loading: false});
            }
            else{
                console.log("Error calling Azure heartbeat service.")
                //this.setState({azure_alive:'Dead'});
                this.setState({azure_loading: false});
            }
        };
        this.xhr_azure.send();

    }

    componentWillUnmount()
    {
      this.xhr.abort();
      this.xhr_aws.abort();
      this.xhr_azure.abort();
    }

    handleChange(key, evt){
      console.log(evt);

      var value = evt.currentTarget.attributes[0].value;

      this.setState({function_region_selected:value});

      var aws_record = findRegionRecords(value, this.state.aws_prices);
      this.setState({aws_current_price:aws_record});

      var azure_record = findRegionRecords(value, this.state.azure_prices);
      this.setState({azure_current_price:azure_record});

      var gcp_record = findRegionRecords(value, this.state.gcp_prices);
      this.setState({gcp_current_price:gcp_record});

    }

    handleNumFunctionChange(key, evt){

      this.setState({function_number: event.target.value});

    }

    handleRunTimeChange(key, evt){

      var value = evt.currentTarget.attributes[0].value;
      this.setState({function_average_time: value});

    }

    handleInvocationsChange(key, evt){

      var value = evt.currentTarget.attributes[0].value;
      this.setState({function_invocations: value});

    }

    handleMemoryChange(key, evt){

      var value = evt.currentTarget.attributes[0].value;
      this.setState({function_memory: value});

    }

    render(){

      const regionSelected = this.state.function_region_selected;
      const functionNumber = this.state.function_number;
      const functionAverageTime = this.state.function_average_time;
      const functionInvocations = this.state.function_invocations;
      const functionMemoryAmount = this.state.function_memory;

      var gcpLoading = this.state.gcp_loading;
      var awsLoading = this.state.aws_loading;
      var azureLoading = this.state.azure_loading;

      const localGcpPrices = this.state.gcp_current_price;
      const localAwsPrices = this.state.aws_current_price;
      const localAzurePrices = this.state.azure_current_price;

      var googleMemory = findRecordType(localGcpPrices, "Memory Time");
      var googleCpu = findRecordType(localGcpPrices, "CPU Time");
      var googleInvocations = findRecordType(localGcpPrices, "Invocations");

      googleMemory = this.gcpComputedValues(googleMemory, "Memory Time", 400000, functionNumber, functionMemoryAmount, functionInvocations, functionAverageTime);
      googleCpu = this.gcpComputedValues(googleCpu, "CPU Time", 200000, functionNumber, functionMemoryAmount, functionInvocations, functionAverageTime);
      googleInvocations = this.gcpComputedValues(googleInvocations, "Invocations", 2000000, functionNumber, functionMemoryAmount, functionInvocations, functionAverageTime);

      //const googleInvocations = this.getInvocationRecord(localGcpPrices, functionNumber, functionInvocations, 2000000);
      //const googleMemory = this.getMemoryRecord(localGcpPrices, functionNumber, functionInvocations, functionAverageTime, functionMemoryAmount, 400000);
      //const googleCpu = this.getCPURecord(localGcpPrices, functionNumber, functionInvocations, functionAverageTime, functionMemoryAmount, 200000);

      const gcpTotalAmount = googleInvocations.cost + googleMemory.cost + googleCpu.cost;
      const awsTotalAmount = 14;
      const azureTotalAmount = 15.50;

      return <div>{ (awsLoading || azureLoading || gcpLoading) ? <Wave text="Thinking..." effect="fadeOut"/> : <div>
      <div>
        <h2>Comparison</h2>
        <p>If a provider shows NA for a region, that means it does not support serverless functions in that area.</p>
      </div>
      <Container className='containerFormat'>
        <Row>
          <Col xs={12} md={6}>
          <Container className='containerFormat'>
            <Row>
              <Col xs={12} md={6}>
              <input
                className='roundedCorner inputPadding'
                id="numFunctions"
                type="text"
                placeholder="# of Functions"
                onBlur={this.handleNumFunctionChange}
                />
              </Col>
              <Col xs={12} md={6} >
                <NumInvocationButton OnChangeDone={this.handleInvocationsChange} />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}><MemoryButton OnChangeDone={this.handleMemoryChange}/></Col>
              <Col xs={12} md={6}><RunTimeButton OnChangeDone={this.handleRunTimeChange} /></Col>
            </Row>
            <Row>
              <Col xs={12} md={6}><ServerlessButton  OnChangeDone={this.handleChange}/></Col>
            </Row>
          </Container>
          </Col>
          <Col xs={12} md={6}>
            <TotalCostComparison gcpTotalCost={gcpTotalAmount} awsTotalCost={awsTotalAmount} azureTotalCost={azureTotalAmount} />
          </Col>
        </Row>
      </Container>
      <DisplayState regionSelected={regionSelected} functionNumber ={functionNumber} functionAverageTime={functionAverageTime} functionInvocations={functionInvocations} functionMemoryAmount={functionMemoryAmount}></DisplayState>
      <GoogleTable googleCpuRecord={googleCpu} googleMemoryRecord={googleMemory} googleInvocationRecord={googleInvocations} totalMonthly={gcpTotalAmount}></GoogleTable>
        </div>}
    </div>;
    }


    gcpComputedValues(record, type, discount, functionNumber, functionMemoryAmount, functionInvocations, functionAverageTime)
    {
      var newRecord = record;

      if(record.name != "N/A")
      {

        if(type == "Memory Time")
        {
          var memoryFraction = functionMemoryAmount/1024;
          newRecord.unitsConsumed = (memoryFraction * ((functionInvocations * functionAverageTime)/1000)) * functionNumber;
        }
        else if (type == "CPU Time")
        {
          var cpuFraction = (this.state.gcp_cpu_assignments[functionMemoryAmount].cpu)/1000;
          newRecord.unitsConsumed = (cpuFraction * ((functionInvocations * functionAverageTime)/1000)) * functionNumber;
        }
        else if (type == "Invocations")
        {
          newRecord.unitsConsumed = functionNumber * functionInvocations;
        }

        newRecord.unitsCharged = newRecord.unitsConsumed - discount;
        if(newRecord.unitsCharged < 0){newRecord.unitsCharged = 0};
        newRecord.cost = newRecord.unitsCharged * newRecord.pricePerUnit;

      }

      return newRecord;

    }

}
