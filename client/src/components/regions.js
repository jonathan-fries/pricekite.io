import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Table from 'react-bootstrap/Table'
import './regions.scss';

export default class Regions extends React.Component{

  constructor(props){
        super(props);
        this.state = { loading: true, contentfulItems:{ title: 'Pricekite Regions', descriptions:[]}};

        var contentful = require('contentful');

        var client = contentful.createClient({
            space: 'qgqta6z9ueb1',
            accessToken: 'yZTWvh8c5qnTyKuYnQ45_kzTO6IVynSI6K4c2Hx11mI'
          })

        client.getEntry('27l3cuPfj2vbzyfyYlphF2')
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

    render(){

        const loading = this.state.loading;

        return <div>
                  <div><div className="regionsText"><h2>{this.state.contentfulItems.title}</h2>
                  <div>{ loading ? <div><p>Because every cloud provider looks at the world a little differently, we had to come up with a means to compare the prices around the world.  This involved looking at each provider's regions and find a way to map them, where possible.</p><p>When a cloud provider did not supply a region, we have either had to map it to geographically equivalent region (this was the approach in Europe where there are a lot of data centers) or simply excluding the cloud supplier from that particular comparison.</p><p>In the latter case, you will see the cloud provider marked as NONE in the matrix.</p></div> : documentToReactComponents(this.state.contentfulItems.description) }</div></div></div>
                  <div className="clearIt"></div>
                  <div>
                    <Table>
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
                            <td>US East 1</td>
                            <td>US East (N. Virginia)</td>
                            <td>East US</td>
                            <td>us-east4</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                    </Table>
                  </div>
                </div>;
    }
}
