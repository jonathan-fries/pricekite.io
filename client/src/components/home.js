import React from 'react';
import GoogleIpAddress from './price_display/static_ip_address/google_ip_address';
import AzureIpAddress from './price_display/static_ip_address/azure_ip_address';
import AWSIpAddress from './price_display/static_ip_address/aws_ip_address';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default class Home extends React.Component{

  constructor(props){
        super(props);
        this.state = {contentfulItems:{ title: 'Static IP Address Pricing', descriptions:[]}};

        var contentful = require('contentful');

        var client = contentful.createClient({
            space: 'qgqta6z9ueb1',
            accessToken: 'yZTWvh8c5qnTyKuYnQ45_kzTO6IVynSI6K4c2Hx11mI'
          })

        client.getEntry('6NW2FdhjgFdWo1ISgltEUp')
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

    render(){
        return <div>
                  <h2>{this.state.contentfulItems.title}</h2>
                  {documentToReactComponents(this.state.contentfulItems.description)}
                  <h2>Google</h2>
                  <GoogleIpAddress/>
                  <h2>AWS</h2>
                  <AWSIpAddress />
                  <h2>Azure</h2>
                  <AzureIpAddress />
                </div>;
    }
}
