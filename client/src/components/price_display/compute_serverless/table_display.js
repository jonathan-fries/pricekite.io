import React from 'react';
import Table from 'react-bootstrap/Table';
import './table_display.scss';

//import { Wave } from 'react-animated-text';

export default class TableDisplay extends React.Component{

  constructor(props){
        super(props);

      }

      render()
      {
        const azurePrices = this.props.azurePrices;
        const awsPrices = this.props.awsPrices;
        const gcpPrices = this.props.gcpPrices;

        return <div>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <td className='providerColumn'>Provider</td>
              <td className='dailyColumn'>Daily</td>
              <td className='regionColumn'>Region</td>
              <td>Base Units</td>
              <td>Base Price</td>
              <td>Sku</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{azurePrices.provider}</td>
              <td>${+(azurePrices.pricePerUnit * 60 * 60 * 24).toFixed(2)}</td>
              <td>{azurePrices.pricekiteRegion}</td>
              <td>{azurePrices.unit}</td>
              <td>${azurePrices.pricePerUnit}</td>
              <td>{azurePrices.sku}</td>
            </tr>
            <tr>
              <td>{awsPrices.provider}</td>
              <td>${awsPrices.daily != 0.00 ? +(awsPrices.daily).toFixed(2) : "--"}</td>
              <td>{awsPrices.pricekiteRegion}</td>
              <td>{awsPrices.unit}</td>
              <td>${awsPrices.pricePerUnit != 0 ? awsPrices.pricePerUnit : "--"}</td>
              <td>{awsPrices.sku}</td>
            </tr>
            <tr>
              <td>{gcpPrices.provider}</td>
              <td>${gcpPrices.daily != 0.00 ? +(gcpPrices.daily).toFixed(2) : "--"}</td>
              <td>{gcpPrices.pricekiteRegion}</td>
              <td>{gcpPrices.unit}</td>
              <td>${gcpPrices.pricePerUnit != 0.00 ? +(gcpPrices.pricePerUnit).toFixed(8) : "--"}</td>
              <td>{gcpPrices.sku}</td>
            </tr>
          </tbody>
        </Table></div>;
      }

    }
