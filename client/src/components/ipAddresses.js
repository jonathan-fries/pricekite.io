import React from 'react';
import GoogleIpAddress from './price_display/static_ip_address/google_ip_address';
import AzureIpAddress from './price_display/static_ip_address/azure_ip_address';
import AWSIpAddress from './price_display/static_ip_address/aws_ip_address';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import StatusIndicator from './status_indicator/status_indicator';
import './ipAddresses.scss';

export default class Home extends React.Component{

  constructor(props){
        super(props);
        this.state = {contentfulItems:{ title: 'Static IP Address Pricing', descriptions:[]}};

        var contentful = require('contentful');

        this.client = contentful.createClient({
            space: 'qgqta6z9ueb1',
            accessToken: 'yZTWvh8c5qnTyKuYnQ45_kzTO6IVynSI6K4c2Hx11mI'
          })

        this.client.getEntry('6NW2FdhjgFdWo1ISgltEUp')
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
        document.title = "Static IP Address Price Comparison";
        //document.description = "This page compares the prices for static IP Addresses.  It compares AWS, Microsoft Azure, and Google Cloud.";
      }

    render(){
        return <div>
                  <div><div className="ipAddressText"><h2>{this.state.contentfulItems.title}</h2>
                  <div>{documentToReactComponents(this.state.contentfulItems.description)}</div></div>
                  <div className="statusDiv"><StatusIndicator/></div></div>
                  <div className="clearIt"></div>
                  <div>
                  <h2>Google</h2><span>Region: US-Central1</span>
                  <GoogleIpAddress/>
                  <h2>AWS</h2><span>Region: US East (N. Virginia)</span>
                  <AWSIpAddress />
                  <h2>Azure</h2><span>Region: East US</span>
                  <AzureIpAddress />
                  </div>
                </div>;
    }
}
