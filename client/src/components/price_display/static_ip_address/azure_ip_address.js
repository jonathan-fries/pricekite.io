import React from 'react';
import Table from 'react-bootstrap/Table';
import './column_styles.scss'
import { Wave } from 'react-animated-text';

export default class AzureIpAddress extends React.Component{

  constructor(props){
        super(props);
        this.state = {loading: true, azurePriceItems:[{ name: 'Thinking...', monthly: '', skuId: ''}]};

        var ws = "https://pricekite-io.azurewebsites.net/api/ipAddrPrice";

        var xhr = new XMLHttpRequest();
        xhr.open('GET', ws);

        xhr.onload = () => {
            if(xhr.status === 200){
                console.log(xhr.responseText);
                var local_azurePriceItem = [];
                local_azurePriceItem = JSON.parse(xhr.response);
                local_azurePriceItem = JSON.parse(local_azurePriceItem);
                this.setState({azurePriceItems:local_azurePriceItem});
                this.setState({loading: false});
            }
            else{
                console.log("Error calling web service.")
            }
        };
        xhr.send();

    }

  render(){

    const prices = [];
    var i = 0;
    const loading = this.state.loading;

    for(i; i < this.state.azurePriceItems.length; i++)
    {
      prices.push( <tr key={i}>
        <td>{this.state.azurePriceItems[i].name}</td>
        <td>${(+this.state.azurePriceItems[i].monthly).toFixed(2)}</td>
        <td>{this.state.azurePriceItems[i].sku}</td>
      </tr> );
    }

    //const component = ({loading}) => {loading ? '<p>We be waiting.</p>' : '<Table striped bordered hover responsive=\"sm\"><thead><tr><th className=\'headerColumn\'>Item</th><th className=\'headerColumn\'>Monthly</th><th className=\'headerColumn2\'>SKU</th></tr></thead><tbody>{prices}</tbody></Table>}' }

    return <div>
    { loading === true ? <Wave text="Thinking..." effect="fadeOut"/> : <Table striped bordered hover responsive="sm"><thead><tr><th className='headerColumn'>Item</th><th className='headerColumn'>Monthly</th><th className='headerColumn2'>SKU</th></tr></thead><tbody>{prices}</tbody></Table>}
    </div>
  }

}
