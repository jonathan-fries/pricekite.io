import React from 'react';
import { Wave } from 'react-animated-text';
import ServerlessButton from './button.js'
import TableDisplay from './table_display.js'
import GoogleDisplay from './google_display.js'
import './summary.scss';

//import { Wave } from 'react-animated-text';

export default class Summary extends React.Component{

  constructor(props){
        super(props);

        this.state = { gcp_loading: true, gcp_current_price: {}, gcp_prices: [] , aws_loading:true, aws_current_price:{}, aws_prices: [], azure_loading: true, azure_current_price:{}, azure_prices: [] };

        this.handleChange = this.handleChange.bind(this);
        this.findRegionRecord = this.findRegionRecord.bind(this);

        //var ws = "https://api.pricekite.io/v1/gcp-compute-serverless-prices";
        var ws = "https://us-central1-pricekite.cloudfunctions.net/gcp-gcp-compute-serverless-prices";

        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', ws);
        this.xhr.onload = () => {
            if(this.xhr.status === 200){
                console.log(this.xhr.responseText);
                var local_gcp_prices = {};
                local_gcp_prices = JSON.parse(this.xhr.responseText);

                var local_price = this.findRegionRecord(1000, local_gcp_prices);

                this.setState({gcp_prices:local_gcp_prices});
                this.setState({gcp_current_price:local_price});
                this.setState({gcp_loading: false});
            }
            else{
                console.log("Error calling web service.");
                this.setState({gcp_alive:'Dead'});
                this.setState({gcp_loading: false});
            }
        };
        this.xhr.send();

        var ws_aws = "https://api.pricekite.io/v1/aws-compute-serverless-prices";

        this.xhr_aws = new XMLHttpRequest();
        this.xhr_aws.open('GET', ws_aws);
        this.xhr_aws.onload = () => {
            if(this.xhr_aws.status === 200){
                console.log(this.xhr_aws.responseText);
                var local_aws_prices = {};
                local_aws_prices = JSON.parse(this.xhr_aws.responseText);
                local_aws_prices = JSON.parse(local_aws_prices.body);

                var local_price = this.findRegionRecord(1000, local_aws_prices);

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
        var ws_azure = "https://api.pricekite.io/v1/azure-compute-serverless-prices";

        this.xhr_azure = new XMLHttpRequest();
        this.xhr_azure.open('GET', ws_azure);
        this.xhr_azure.onload = () => {
            if(this.xhr_azure.status === 200){
                console.log(this.xhr_azure.responseText);
                var local_azure_prices = {};
                local_azure_prices = JSON.parse(this.xhr_azure.responseText);
                local_azure_prices = JSON.parse(local_azure_prices.body);
                local_azure_prices = local_azure_prices.Items;

                var local_price = this.findRegionRecord(1000, local_azure_prices);

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

      var aws_record = this.findRegionRecord(value, this.state.aws_prices);
      this.setState({aws_current_price:aws_record});

      var azure_record = this.findRegionRecord(value, this.state.azure_prices);
      this.setState({azure_current_price:azure_record});

      var gcp_record = this.findRegionRecord(value, this.state.gcp_prices);
      this.setState({gcp_current_price:gcp_record});

    }


  render(){

    var gcpLoading = this.state.gcp_loading;
    var awsLoading = this.state.aws_loading;
    var azureLoading = this.state.azure_loading;

    const localGcpPrices = this.state.gcp_current_price;
    const localAwsPrices = this.state.aws_current_price;
    const localAzurePrices = this.state.azure_current_price;

    return <div>{ (awsLoading || azureLoading || gcpLoading) ? <Wave text="Thinking..." effect="fadeOut"/> : <div>
    <div><h2>Comparison</h2>
    <p>You can change the region by clicking on the <b>Select Region</b> button.</p>
    <p>If a provider shows NA for a region, that means it does not support serverless functions in that area.</p>
    <p>The Daily number is the $ amount you would be charged if the function ran continuously all day.</p></div>
        <ServerlessButton  OnChangeDone={this.handleChange}/>
        <div>
          <TableDisplay azurePrices={localAzurePrices} awsPrices={localAwsPrices} gcpPrices={localGcpPrices} />
          <div></div>
        </div>
        </div>}
        </div>;
  }

  findRegionRecord(regionId, records)
  {

    var regionRecord = {provider: 'Not Found', daily: 0.00 };
    var i = 0;
    regionId = parseInt(regionId);

      for(i; i < records.length; i++)
      {
        if(records[i].pricekiteRegionId === regionId)
        {
          regionRecord = records[i];
          break;
        }
      }

      if(regionRecord.provider === 'Not Found')
      {
        regionRecord.provider = records[0].provider;
        regionRecord.pricekiteRegion = "NA";
        regionRecord.pricePerUnit = 0.00;
      }

      return regionRecord;
  }

}
