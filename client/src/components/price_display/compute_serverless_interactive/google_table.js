import React from 'react';

//import { Wave } from 'react-animated-text';

export default class GoogleTable extends React.Component{

  constructor(props){
        super(props);
      }

      render(){
        const regionSelected = this.props.regionSelected;
        const numberOfFunctions = this.props.functionNumber;
        const functionAverageTime = this.props.functionAverageTime;
        const functionMemoryAmount = this.props.functionMemoryAmount;
        const functionInvocations = this.props.functionInvocations;

        return <div >

        </div>;
      }

}
