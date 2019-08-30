import React from 'react';

export default class GoogleIpAddress extends React.Component{

  constructor(props){
        super(props);
        this.state = {gcpPriceItem:{ monthly: '', skuId: ''}};

        var ws = "https://us-central1-pricekite.cloudfunctions.net/ip-addr-prices";

        var xhr = new XMLHttpRequest();
        xhr.open('GET', ws);
        xhr.onload = () => {
            if(xhr.status === 200){
                console.log(xhr.responseText);
                var local_gcpPriceItems = [];
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

      const gcpPriceItems = this.props.gcpPriceItems;

      return <table width="100%">
                <tbody>
                    <tr><td>Not in Use:</td><td>{gcpPriceItem.monthly}</td><td>{gcpPriceItem.skuId}</td></tr>
                    <tr><td width="30%">In Use (Standard VM):</td><td>$2.88/month</td><td>For future, no SKU</td></tr>
                    <tr><td width="30%">In Use (Preemptible VM):</td><td>$1.44/month</td><td>For future, no SKU</td></tr>
                </tbody></table>;
          }

}
