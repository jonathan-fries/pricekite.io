import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Table from 'react-bootstrap/Table'
import './regions.scss';

export default class Regions extends React.Component{

  constructor(props){
        super(props);
        this.state = { loading: true, contentfulItems:{ title: 'Pricekite Regions', descriptions:[]}};

        var contentful = require('contentful');

        this.client = contentful.createClient({
            space: 'qgqta6z9ueb1',
            accessToken: 'yZTWvh8c5qnTyKuYnQ45_kzTO6IVynSI6K4c2Hx11mI'
          })

        this.client.getEntry('27l3cuPfj2vbzyfyYlphF2')
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
            this.setState({loading:false});
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
        document.title = "Pricekite.io Region Mapping";
        //document.description = "This page provides information about how Pricekite.io regions work and how we map the regions from the major cloud providers.  We currently compare regions from AWS, Microsoft Azure, and Google Cloud. ";
      }

    render(){

        const loading = this.state.loading;

        return <div>
                  <div><div className="regionsText"><h2>{this.state.contentfulItems.title}</h2>
                  <div>{ loading ? <div><p>Because every cloud provider looks at the world a little differently, Pricekite had to come up with a means to compare the prices around the world.  We reviewed each provider's regions and mapped them to a Pricekite region, where possible.</p><p>When a cloud provider did not supply a region, we have either mapped it to geographically equivalent region (this was the approach in Europe where there are a lot of data centers) or we excluded that supplier from that particular comparison.</p><p>In the latter case, you will see the cloud provider marked as NONE in the matrix.</p></div> : documentToReactComponents(this.state.contentfulItems.description) }</div></div></div>
                  <div className="clearIt"></div>
                  <div>
                    <Table striped bordered hover responsive="sm">
                        <thead>
                          <tr>
                            <th>Pricekite Region</th>
                            <th>AWS Region</th>
                            <th>Azure Region</th>
                            <th>GCP Region</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>USA East 1</td>
                            <td>US East (N. Virginia)</td>
                            <td>East US</td>
                            <td>us-east4</td>
                          </tr>
                          <tr>
                            <td>USA East 2</td>
                            <td>US East (Ohio)</td>
                            <td>East US 2</td>
                            <td>us-east1</td>
                          </tr>
                          <tr>
                            <td>USA West 1</td>
                            <td>US West (N. California)</td>
                            <td>West US</td>
                            <td>us-west2</td>
                          </tr>
                          <tr>
                            <td>USA West 2</td>
                            <td>US West (Oregon)</td>
                            <td>West US 2</td>
                            <td>us-west1</td>
                          </tr>
                          <tr>
                            <td>USA Central 1</td>
                            <td>NONE</td>
                            <td>Central US</td>
                            <td>us-central1</td>
                          </tr>
                          <tr>
                            <td>Canada 1</td>
                            <td>Canada (Central)</td>
                            <td>Canada Central</td>
                            <td>northamerica-northeast1</td>
                          </tr>
                          <tr>
                            <td>Hong Kong 1</td>
                            <td>Asia Pacific (Hong Kong)</td>
                            <td>East Asia</td>
                            <td>asia-east2</td>
                          </tr>
                          <tr>
                            <td>Mumbai 1</td>
                            <td>Asia Pacific (Mumbai)</td>
                            <td>West India</td>
                            <td>asia-south1</td>
                          </tr>
                          <tr>
                            <td>Osaka 1</td>
                            <td>Asia Pacific (Osaka-Local)</td>
                            <td>Japan West</td>
                            <td>asia-northeast2</td>
                          </tr>
                          <tr>
                            <td>Seoul 1</td>
                            <td>Asia Pacific (Seoul)</td>
                            <td>Korea Central</td>
                            <td>None</td>
                          </tr>
                          <tr>
                            <td>Sinagpore 1</td>
                            <td>Asia Pacific (Singapore)</td>
                            <td>Southeast Asia</td>
                            <td>asia-southeast1</td>
                          </tr>
                          <tr>
                            <td>Australia East 1</td>
                            <td>Asia Pacific (Sydney)</td>
                            <td>Australia East</td>
                            <td>australia-southeast1</td>
                          </tr>
                          <tr>
                            <td>Tokyo 1</td>
                            <td>Asia Pacific (Tokyo)</td>
                            <td>Japan East</td>
                            <td>asia-northeast1</td>
                          </tr>
                          <tr>
                            <td>Beijing 1</td>
                            <td>China (Beijing)</td>
                            <td>China North</td>
                            <td>NONE</td>
                          </tr>
                          <tr>
                            <td>Frankfurt 1</td>
                            <td>EU (Frankfurt)</td>
                            <td>Germany West Central</td>
                            <td>europe-west-3</td>
                          </tr>
                          <tr>
                            <td>Ireland 1</td>
                            <td>EU (Ireland)</td>
                            <td>North Europe</td>
                            <td>NONE</td>
                          </tr>
                          <tr>
                            <td>London 1</td>
                            <td>EU (London)</td>
                            <td>UK South</td>
                            <td>euorope-west2</td>
                          </tr>
                          <tr>
                            <td>Paris 1</td>
                            <td>EU (Paris)</td>
                            <td>France Central</td>
                            <td>None</td>
                          </tr>
                          <tr>
                            <td>Europe North 1</td>
                            <td>EU (Stockholm)</td>
                            <td>Norway East</td>
                            <td>europe-north1</td>
                          </tr>
                          <tr>
                            <td>Middle East 1</td>
                            <td>Middle East (Bahrain)</td>
                            <td>UAE Central</td>
                            <td>NONE</td>
                          </tr>
                          <tr>
                            <td>Sao Paolo 1</td>
                            <td>South America (Sao Paulo)</td>
                            <td>Brazil South</td>
                            <td>southamerica-east1</td>
                          </tr>
                          <tr>
                            <td>USA Gov East 1</td>
                            <td>AWS GovCloud (US-East)</td>
                            <td>US Gov Virginia</td>
                            <td>NONE</td>
                          </tr>
                          <tr>
                            <td>USA Gov East 2</td>
                            <td>AWS GovCloud (US-West)</td>
                            <td>US Gov Arizona</td>
                            <td>NONE</td>
                          </tr>
                        </tbody>
                    </Table>
                  </div>
                </div>;
    }
}
