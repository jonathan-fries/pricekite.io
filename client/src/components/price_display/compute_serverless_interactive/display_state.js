import React from 'react';

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

        return <div>
                <span>Region Selected:</span><span><b>{regionSelected}  </b></span>
                <span>Number of Functions:</span><span><b>{numberOfFunctions}  </b></span>
                <span>Avg. Run Time:</span><span><b>{functionAverageTime}  </b></span>
                <span>Memory Amount:</span><span><b>{functionMemoryAmount}  </b></span>
                <span>Invocations:</span><span><b>{functionInvocations}  </b></span>
               </div>;
      }

}
