import React from 'react';
import Table from 'react-bootstrap/Table';
import './column_styles.scss'

export default class AWSIpAddress extends React.Component{

  constructor(props){
        super(props);
        this.state = {awsPriceItem:{ name: 'Thinking...', monthly: '', skuId: ''}};

        var ws = "https://kew5wzdxwh.execute-api.us-east-1.amazonaws.com/prod";

        var xhr = new XMLHttpRequest();
        xhr.open('GET', ws);

        xhr.onload = () => {
            if(xhr.status === 200){
                console.log(xhr.responseText);
                var local_awsPriceItem = [];
                local_awsPriceItem = JSON.parse(xhr.response);
                local_awsPriceItem = JSON.parse(local_awsPriceItem.body);
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
          <th className='headerColumn'>Item</th>
          <th className='headerColumn'>Monthly</th>
          <th className='headerColumn2'>SKU</th>
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
