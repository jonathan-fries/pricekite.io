import React from 'react';
import Table from 'react-bootstrap/Table';

export default class AWSIpAddress extends React.Component{

  constructor(props){
        super(props);
        this.state = {awsPriceItem:{ name: 'Thinking...', monthly: '', skuId: ''}};

        var ws = "https://kew5wzdxwh.execute-api.us-east-1.amazonaws.com/default/ipAddressPrice";

        var xhr = new XMLHttpRequest();
        xhr.open('GET', ws);
        xhr.setRequestHeader('x-api-key', 'y1wZ0dFDvA3nVPHbJP7Gcawl2V8L6PGu17uIxs0t');
        xhr.onload = () => {
            if(xhr.status === 200){
                console.log(xhr.responseText);
                var local_awsPriceItem = [];
                local_awsPriceItem = JSON.parse(xhr.responseText);
                this.setState({awsPriceItem:local_awsPriceItem});
            }
            else{
                console.log("Error calling web service.")
            }
        };
        xhr.send();

    }

  render(){
    return <Table striped bordered hover responsive="sm">
      <thead>
        <tr>
          <th>Item</th>
          <th>Monthly</th>
          <th>SKU</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>First, In Use:</td>
        <td>$0/month</td>
        <td>SKU-less, it's magic.</td>
      </tr>
        <tr>
          <td>{this.state.awsPriceItem.name}</td>
          <td>${(+this.state.awsPriceItem.monthly).toFixed(2)}</td>
          <td>{this.state.awsPriceItem.sku}</td>
        </tr>
      </tbody>
    </Table>;
  }

}
