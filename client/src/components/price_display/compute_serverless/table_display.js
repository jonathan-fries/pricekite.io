import React from 'react';
import Table from 'react-bootstrap/Table';
import { Wave } from 'react-animated-text';

//import { Wave } from 'react-animated-text';

export default class TableDisplay extends React.Component{

  constructor(props){
        super(props);

      }

      render()
      {
        const azurePrices = this.props.azurePrices;
        const awsPrices = this.props.awsPrices;

        return <Table striped bordered hover responsive="sm">
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
              <td>{azurePrices.provider}</td>
              <td>${+(azurePrices.daily).toFixed(2)}</td>
              <td>{azurePrices.unit}</td>
              <td>${azurePrices.pricePerUnit}</td>
              <td>{azurePrices.sku}</td>
            </tr>
            <tr>
              <td>{awsPrices.provider}</td>
              <td>${+(awsPrices.daily).toFixed(2)}</td>
              <td>{awsPrices.unit}</td>
              <td>${awsPrices.pricePerUnit}</td>
              <td>{awsPrices.sku}</td>
            </tr>
          </tbody>
        </Table>;
      }

    }
