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
              <td className='providerColumn'>...</td>
              <td className='dailyColumn'>Daily*</td>
              <td className='regionColumn'>Region</td>
              <td>Time</td>
              <td>Base Units</td>
              <td>Base Price</td>
              <td>Sku</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{azurePrices.provider}</td>
              <td>${+(azurePrices.daily).toFixed(2)}</td>
              <td>{azurePrices.pricekiteRegion}</td>
              <td>N/A</td>
              <td>{azurePrices.unit}</td>
              <td>${azurePrices.pricePerUnit}</td>
              <td>{azurePrices.sku}</td>
            </tr>
            <tr>
              <td>{awsPrices.provider}</td>
              <td>${+(awsPrices.daily).toFixed(2)}</td>
              <td>{awsPrices.pricekiteRegion}</td>
              <td>N/A</td>
              <td>{awsPrices.unit}</td>
              <td>${awsPrices.pricePerUnit}</td>
              <td>{awsPrices.sku}</td>
            </tr>
            <tr>
              <td>{gcpPrices.provider}</td>
              <td>${+(gcpPrices.pricePerUnit * 3000 * 60 * 24 ).toFixed(2)}</td>
              <td>All Offered Regions</td>
              <td>20 ms</td>
              <td>{gcpPrices.unit}</td>
              <td>${(gcpPrices.pricePerUnit).toFixed(8)}</td>
              <td>{gcpPrices.sku}</td>
            </tr>
            <tr>
              <td>{gcpPrices.provider}</td>
              <td>${+(gcpPrices.pricePerUnit * 2857 * 60 * 24 ).toFixed(2)}</td>
              <td>All Offered Regions</td>
              <td>21 ms</td>
              <td>{gcpPrices.unit}</td>
              <td>${(gcpPrices.pricePerUnit).toFixed(8)}</td>
              <td>{gcpPrices.sku}</td>
            </tr>
            <tr>
              <td>{gcpPrices.provider}</td>
              <td>${+(gcpPrices.pricePerUnit * 2727 * 60 * 24 ).toFixed(2)}</td>
              <td>All Offered Regions</td>
              <td>22 ms</td>
              <td>{gcpPrices.unit}</td>
              <td>${(gcpPrices.pricePerUnit).toFixed(8)}</td>
              <td>{gcpPrices.sku}</td>
            </tr>
            <tr>
              <td>{gcpPrices.provider}</td>
              <td>${+(gcpPrices.pricePerUnit * 2608 * 60 * 24 ).toFixed(2)}</td>
              <td>All Offered Regions</td>
              <td>23 ms</td>
              <td>{gcpPrices.unit}</td>
              <td>${(gcpPrices.pricePerUnit).toFixed(8)}</td>
              <td>{gcpPrices.sku}</td>
            </tr>
            <tr>
              <td>{gcpPrices.provider}</td>
              <td>${+(gcpPrices.pricePerUnit * 2500 * 60 * 24 ).toFixed(2)}</td>
              <td>All Offered Regions</td>
              <td>24 ms</td>
              <td>{gcpPrices.unit}</td>
              <td>${(gcpPrices.pricePerUnit).toFixed(8)}</td>
              <td>{gcpPrices.sku}</td>
            </tr>
            <tr>
              <td>{gcpPrices.provider}</td>
              <td>${+(gcpPrices.pricePerUnit * 2400 * 60 * 24 ).toFixed(2)}</td>
              <td>All Offered Regions</td>
              <td>25 ms</td>
              <td>{gcpPrices.unit}</td>
              <td>${(gcpPrices.pricePerUnit).toFixed(8)}</td>
              <td>{gcpPrices.sku}</td>
            </tr>
            <tr>
              <td>{gcpPrices.provider}</td>
              <td>${+(gcpPrices.pricePerUnit * 600 * 60 * 24 ).toFixed(2)}</td>
              <td>All Offered Regions</td>
              <td>100 ms</td>
              <td>{gcpPrices.unit}</td>
              <td>${(gcpPrices.pricePerUnit).toFixed(8)}</td>
              <td>{gcpPrices.sku}</td>
            </tr>
          </tbody>
        </Table></div>;
      }

    }
