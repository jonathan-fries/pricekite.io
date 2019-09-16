import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import StatusIndicator from './status_indicator/status_indicator';
import './home.scss';
import Summary from './price_display/compute_serverless/summary.js';

export default class ComputeServerless extends React.Component{

  constructor(props){
        super(props);
        this.state = {contentfulItems:{ title: 'Serverless Compute Pricing', descriptions:[]}};

        var contentful = require('contentful');

        this.client = contentful.createClient({
            space: 'qgqta6z9ueb1',
            accessToken: 'yZTWvh8c5qnTyKuYnQ45_kzTO6IVynSI6K4c2Hx11mI'
          })

        this.client.getEntry('1vsV40J7PtxvwjXMFwx8CV')
          .then((entry) => {
            // logs the entry metadata
            console.log(entry.sys)

            // logs the field with ID title
            console.log(entry.fields.title)
            var local_contentfulItems = {title:'', description:[]};
            local_contentfulItems.title = entry.fields.title;
            console.log(entry.fields.description)
            local_contentfulItems.description = entry.fields.description;

            this.setState({contentfulItems:local_contentfulItems});

          })
          .catch((err) => {
            console.log(err.message)
          })

      }

      componentWillUnmount()
      {
        this.client = null;
      }

      componentDidMount()
      {
        document.title = "Serverless Compute Price Comparison";
        //document.description = "This page compares the prices for serverless compute.  It compares AWS Lambda, Azure Functions, and Google Cloud Functions.";
      }

    render(){

        return <div>
                  <div><div className="ipAddressText"><h2>{this.state.contentfulItems.title}</h2>
                  <div>{documentToReactComponents(this.state.contentfulItems.description)}</div></div>
                  <div className="statusDiv"><StatusIndicator/></div></div>
                  <div className="clearIt"></div>
                  <div>
                    <Summary />
                  </div>
                </div>;
    }
}
