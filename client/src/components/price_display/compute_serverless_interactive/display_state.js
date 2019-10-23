import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class DisplayState extends React.Component{

  constructor(props){
        super(props);
      }

      render(){
        const regionSelected = this.props.regionSelected;
        const numberOfFunctions = this.props.functionNumber;
        const functionAverageTime = this.props.functionAverageTime;
        const functionMemoryAmount = this.props.functionMemoryAmount;
        const functionInvocations = this.props.functionInvocations;

        return <Container className="containerFormat">
                <Row>
                  <Col xs={12} md={4}><span>Region Selected: <b>{regionSelected}</b></span></Col>
                  <Col xs={12} md={4}><span>Number of Functions: <b>{numberOfFunctions}</b></span></Col>
                  <Col xs={12} md={4}><span>Avg. Run Time: <b>{functionAverageTime} ms</b></span></Col>
                </Row>
                <Row>
                  <Col xs={12} md={4}><span>Memory Amount: <b>{functionMemoryAmount} MB</b></span></Col>
                  <Col xs={12} md={4}><span>Invocations: <b>{functionInvocations}/function/month</b></span></Col>
                </Row>
               </Container>;
      }

}
