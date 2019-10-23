import React from 'react';

export default class DisplayState extends React.Component{

  constructor(props){
        super(props);
      }

      render(){
        const regionSelected = this.props.regionSelected;
        return <div>
                <span>Region Selected:</span><span>{regionSelected}</span>
               </div>;
      }

}
