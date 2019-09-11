import React from 'react';
import Table from 'react-bootstrap/Table';
import './table_display.scss';

//import { Wave } from 'react-animated-text';

export default class GoogleDisplay extends React.Component{

  constructor(props){
        super(props);

      }

      render()
      {
        const googlePrices = this.props.googlePrices;

        return <div><Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <td className='providerColumn'>...</td>
              <td>Base Units</td>
              <td>Base Price</td>
              <td>Sku</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>{googlePrices.unit}</td>
              <td>${(googlePrices.rate).toFixed(8)}</td>
              <td>{googlePrices.sku}</td>
            </tr>
          </tbody>
        </Table>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <td className='providerColumn'>...</td>
              <td>Time Duration</td>
              <td className='dailyColumn'>Daily*</td>
              <td>Calculation</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>20 ms</td>
              <td>${+(googlePrices.rate * 3000 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 3000 * 60 * 24'</td>
            </tr>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>21 ms</td>
              <td>${+(googlePrices.rate * 2857 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 2857 * 60 * 24'</td>
            </tr>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>22 ms</td>
              <td>${+(googlePrices.rate * 2727 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 2727 * 60 * 24'</td>
            </tr>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>23 ms</td>
              <td>${+(googlePrices.rate * 2608 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 2608 * 60 * 24'</td>
            </tr>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>24 ms</td>
              <td>${+(googlePrices.rate * 2500 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 2500 * 60 * 24'</td>
            </tr>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>25 ms</td>
              <td>${+(googlePrices.rate * 2400 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 2400 * 60 * 24'</td>
            </tr>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>100 ms</td>
              <td>${+(googlePrices.rate * 600 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 600 * 60 * 24'</td>
            </tr>
          </tbody>
        </Table></div>;
      }

    }
