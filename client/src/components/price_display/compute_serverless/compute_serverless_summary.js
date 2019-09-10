import React from 'react';
import Table from 'react-bootstrap/Table';
import { Wave } from 'react-animated-text';
import ServerlessButton from './serverless_button.js'

//import { Wave } from 'react-animated-text';

export default class ComputeServerlessSummary extends React.Component{

  constructor(props){
        super(props);

        this.state = { gcp_loading: true, gcp_prices: [] , aws_loading:true, aws_prices: [], azure_loading: true, azure_prices: [] };

        var ws = "https://api.pricekite.io/v1/gcp-compute-serverless-prices";

        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', ws);
        this.xhr.onload = () => {
            if(this.xhr.status === 200){
                console.log(this.xhr.responseText);
                var local_gcp_hearbeat = {};
                local_gcp_hearbeat = JSON.parse(xhr.responseText);
                this.setState({gcp_prices:local_gcp_hearbeat.status});
                this.setState({gcp_loading: false});
            }
            else{
                console.log("Error calling web service.");
                this.setState({gcp_alive:'Dead'});
                this.setState({gcp_loading: false});
            }
        };
        //this.xhr.send();

        var ws_aws = "https://api.pricekite.io/v1/aws-compute-serverless-prices";

        this.xhr_aws = new XMLHttpRequest();
        this.xhr_aws.open('GET', ws_aws);
        this.xhr_aws.onload = () => {
            if(this.xhr_aws.status === 200){
                console.log(this.xhr_aws.responseText);
                var local_aws_prices = {};
                local_aws_prices = JSON.parse(this.xhr_aws.responseText);
                local_aws_prices = JSON.parse(local_aws_prices.body);
                this.setState({aws_prices:local_aws_prices});
                this.setState({aws_loading: false});
            }
            else{
                console.log("Error calling AWS heartbeat service.")
                //this.setState({aws_alive:'Dead'});
                this.setState({aws_loading: false});
            }
        };
        this.xhr_aws.send();


        var ws_azure = "https://api.pricekite.io/v1/azure-compute-serverless-prices";

        this.xhr_azure = new XMLHttpRequest();
        this.xhr_azure.open('GET', ws_azure);
        this.xhr_azure.onload = () => {
            if(this.xhr_azure.status === 200){
                console.log(this.xhr_azure.responseText);
                var local_azure_prices = {};
                local_azure_prices = JSON.parse(this.xhr_azure.responseText);
                local_azure_prices = JSON.parse(local_azure_prices);
                this.setState({azure_prices:local_azure_prices});
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


  render(){

    var gcpLoading = this.state.gcp_loading;
    var awsLoading = this.state.aws_loading;
    var azureLoading = this.state.azure_loading;

    //const gcpPrices = this.state.gcp_prices;
    const awsPrices = this.state.aws_prices;
    const azurePrices = this.state.azure_prices;

    return <div><div><ServerlessButton/></div>
      <div></div>
      <div>{ (awsLoading || azureLoading) ? <Wave text="Thinking..." effect="fadeOut"/> : <Table>
        <thead>
          <tr>
            <td>Provider</td>
            <td>Daily*</td>
            <td>Base Units</td>
            <td>Base Price</td>
            <td>Sku</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{azurePrices[0].provider}</td>
            <td>${+(azurePrices[0].daily).toFixed(2)}</td>
            <td>{azurePrices[0].unit}</td>
            <td>${azurePrices[0].pricePerUnit}</td>
            <td>{azurePrices[0].sku}</td>
          </tr>
          <tr>
            <td>{awsPrices[0].provider}</td>
            <td>${+(awsPrices[0].daily).toFixed(2)}</td>
            <td>{awsPrices[0].unit}</td>
            <td>${awsPrices[0].pricePerUnit}</td>
            <td>{awsPrices[0].sku}</td>
          </tr>
        </tbody>
      </Table>
      }
      <div><p>*What would your function cost if it ran all day?  This tends to provide a more human readable $ amount, as well as contextual scale.</p></div>
      </div>
      </div>
  }
}
