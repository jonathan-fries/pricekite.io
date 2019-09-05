import React from 'react';
import Table from 'react-bootstrap/Table';
import './status_indicator.scss'
import { Wave } from 'react-animated-text';

//import { Wave } from 'react-animated-text';

export default class StatusIndicator extends React.Component{

  constructor(props){
        super(props);

        this.state = { gcp_loading: true, gcp_alive: 'Unknown' , aws_loading:true, aws_alive: 'Unkown', azure_loading: true, azure_alive: 'Unknown' };

        var ws = "https://us-central1-pricekite.cloudfunctions.net/heartbeat";

        var xhr = new XMLHttpRequest();
        xhr.open('GET', ws);
        xhr.onload = () => {
            if(xhr.status === 200){
                console.log(xhr.responseText);
                var local_gcp_hearbeat = {};
                local_gcp_hearbeat = JSON.parse(xhr.responseText);
                this.setState({gcp_alive:local_gcp_hearbeat.status});
                this.setState({gcp_loading: false});
            }
            else{
                console.log("Error calling web service.");
                this.setState({gcp_alive:'Dead'});
                this.setState({gcp_loading: false});
            }
        };
        xhr.send();

        var ws_aws = "https://kew5wzdxwh.execute-api.us-east-1.amazonaws.com/prod/heartbeat";

        var xhr_aws = new XMLHttpRequest();
        xhr_aws.open('GET', ws_aws);
        xhr_aws.onload = () => {
            if(xhr_aws.status === 200){
                console.log(xhr_aws.responseText);
                var local_aws_hearbeat = {};
                local_aws_hearbeat = JSON.parse(xhr_aws.responseText);
                this.setState({aws_alive:local_aws_hearbeat.body.status});
                this.setState({aws_loading: false});
            }
            else{
                console.log("Error calling AWS heartbeat service.")
                this.setState({aws_alive:'Dead'});
                this.setState({aws_loading: false});
            }
        };
        xhr_aws.send();


        var ws_azure = "https://pricekite-io.azurewebsites.net/api/heartbeat";

        var xhr_azure = new XMLHttpRequest();
        xhr_azure.open('GET', ws_azure);
        xhr_azure.onload = () => {
            if(xhr_azure.status === 200){
                console.log(xhr_azure.responseText);
                var local_azure_heartbeat = {};
                local_azure_heartbeat = JSON.parse(xhr_azure.responseText);
                local_azure_heartbeat = JSON.parse(local_azure_heartbeat);
                this.setState({azure_alive:local_azure_heartbeat.status});
                this.setState({azure_loading: false});
            }
            else{
                console.log("Error calling Azure heartbeat service.")
                this.setState({azure_alive:'Dead'});
                this.setState({azure_loading: false});
            }
        };
        xhr_azure.send();

    }


  render(){

    var gcpLoading = this.state.gcp_loading;
    var awsLoading = this.state.aws_loading;
    var azureLoading = this.state.azure_loading;

    var gcpAlive = this.state.gcp_alive;
    var awsAlive = this.state.aws_alive;
    var azureAlive = this.state.azure_alive;

    return <Table striped bordered hover responsive="sm">
      <thead>
        <tr>
          <th className='statusHeaderColumn'>Google</th>
          <th className='statusHeaderColumn'>AWS</th>
          <th className='statusHeaderColumn'>Azure</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={gcpAlive} >{ gcpLoading ? <Wave text="......" effect="fadeOut"/> : <div>{gcpAlive}</div> } </td>
          <td className={awsAlive} >{ awsLoading ? <Wave text="......" effect="fadeOut"/> : <div>{awsAlive}</div> } </td>
          <td className={azureAlive} > { azureLoading ? <Wave text="......" effect="fadeOut"/> : <div>{awsAlive}</div> }</td>
        </tr>
      </tbody>
    </Table>
  }
}
