import React from 'react';
import Table from 'react-bootstrap/Table';
import '../column_styles.scss'
import { Wave } from 'react-animated-text';

export default class GoogleIpAddress extends React.Component{

  constructor(props){
        super(props);
        this.state = { loading: true, gcpPriceItem:{ name: 'Thinking...', monthly: '', skuId: ''}};

        var ws = "https://api.pricekite.io/v1/gcp-ip-address-prices";

        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', ws);
        this.xhr.onload = () => {
            if(this.xhr.status === 200){
                //console.log(this.xhr.responseText);
                var local_gcpPriceItem = [];
                local_gcpPriceItem = JSON.parse(this.xhr.responseText);
                this.setState({gcpPriceItem:local_gcpPriceItem});
                this.setState({loading: false});
            }
            else{
                console.log("Error calling web service.")
            }
        };
        this.xhr.send();

    }

    componentWillUnmount()
    {
      this.xhr.abort();
    }

  render(){

    const loading = this.state.loading;


    return <div>
    { loading === true ? <Wave text="Thinking..." effect="fadeOut"/> : <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
          <th className='headerColumn'>Item</th>
          <th className='headerColumn'>Monthly</th>
          <th className='headerColumn2'>SKU</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.state.gcpPriceItem.name}</td>
            <td>${(+this.state.gcpPriceItem.monthly).toFixed(2)}</td>
            <td>{this.state.gcpPriceItem.skuId}</td>
          </tr>
          <tr>
            <td>In Use (Standard VM):</td>
            <td>$2.88/month</td>
            <td>FUTURE Jan. 1, 2020</td>
          </tr>
          <tr>
            <td>In Use (Preemptible VM):</td>
            <td>$1.44/month</td>
            <td>FUTURE Jan. 1, 2020</td>
          </tr>
        </tbody>
      </Table>} </div>

      }

}
