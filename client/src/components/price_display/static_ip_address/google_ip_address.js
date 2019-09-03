import React from 'react';
import Table from 'react-bootstrap/Table';
import './column_styles.scss'

export default class GoogleIpAddress extends React.Component{

  constructor(props){
        super(props);
        this.state = {gcpPriceItem:{ name: 'Thinking...', monthly: '', skuId: ''}};

        var ws = "https://us-central1-pricekite.cloudfunctions.net/ip-addr-prices";

        var xhr = new XMLHttpRequest();
        xhr.open('GET', ws);
        xhr.onload = () => {
            if(xhr.status === 200){
                console.log(xhr.responseText);
                var local_gcpPriceItem = [];
                local_gcpPriceItem = JSON.parse(xhr.responseText);
                this.setState({gcpPriceItem:local_gcpPriceItem});
            }
            else{
                console.log("Error calling web service.")
            }
        };
        xhr.send();

    }

  render(){

      //const gcpPriceItem = this.props.gcpPriceItem;

      return <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th className='headerColumn'>Item</th>
            <th>Monthly</th>
            <th>SKU</th>
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
      </Table>;

      }

}
