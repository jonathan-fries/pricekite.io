import React from 'react';
import Table from 'react-bootstrap/Table';
import './table_display.scss';
import Accordion from  'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

//import { Wave } from 'react-animated-text';

export default class GoogleDisplay extends React.Component{

  constructor(props){
        super(props);

      }

      render()
      {
        const googlePrices = this.props.googlePrices;

        return <Accordion>
          <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <h2>More About Google</h2><span>(Click Here)</span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
          <Card.Body>
        <div>
        <p>Google is different.  They have 1 sku for the whole world and they charge by invocations, instead of duration.</p>
        <p>Here is the base sku, more information is necessary to understand and compare prices.</p>
        <Table striped bordered hover responsive="sm">
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
              <td>${(googlePrices.pricePerUnit).toFixed(8)}</td>
              <td>{googlePrices.sku}</td>
            </tr>
          </tbody>
        </Table>
        <p>In order to compare the price we must think about how long a function will run.</p>
        <p>Below are some relevant run times, to use in comparing prices.  By figuring out how many times a function would fit into a second, we can do some basic multiplication to figure out a daily rate.</p>
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
              <td>${+(googlePrices.pricePerUnit * 3000 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 3000 * 60 * 24'</td>
            </tr>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>21 ms</td>
              <td>${+(googlePrices.pricePerUnit * 2857 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 2857 * 60 * 24'</td>
            </tr>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>22 ms</td>
              <td>${+(googlePrices.pricePerUnit * 2727 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 2727 * 60 * 24'</td>
            </tr>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>23 ms</td>
              <td>${+(googlePrices.pricePerUnit * 2608 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 2608 * 60 * 24'</td>
            </tr>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>24 ms</td>
              <td>${+(googlePrices.pricePerUnit * 2500 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 2500 * 60 * 24'</td>
            </tr>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>25 ms</td>
              <td>${+(googlePrices.pricePerUnit * 2400 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 2400 * 60 * 24'</td>
            </tr>
            <tr>
              <td>{googlePrices.provider}</td>
              <td>100 ms</td>
              <td>${+(googlePrices.rate * 600 * 60 * 24 ).toFixed(2)}</td>
              <td>'Price * 600 * 60 * 24'</td>
            </tr>
          </tbody>
        </Table>
        <p>So, at times below 20 ms, Google becomes expensive compared with AWS and Azure.  The heartbeat function that powers the staus indicator above typically takes approximately 3 ms to run on GCP.  This is expensive, relatively speaking.</p>
        <p>Currently, (9/11/19) times at or above 25 ms are always cheaper on GCP.  While times between the two can vary depending on which region you run them in.  The rate retrieval function typically runs in the neighborhood of 50 ms, making it relatively cheap.</p>
        </div>
        </Card.Body>
  </Accordion.Collapse>
</Card>
</Accordion>;
      }

    }
