import React from 'react';


export default class About extends React.Component{

  constructor(props){
        super(props);
        this.state = {contentfulItems:{ title: 'Abut Pricekite', descriptions:[]}};

        var contentful = require('contentful');

        var client = contentful.createClient({
            space: 'qgqta6z9ueb1',
            accessToken: 'yZTWvh8c5qnTyKuYnQ45_kzTO6IVynSI6K4c2Hx11mI'
          })

        client.getEntry('6v03ToUq3gJ7f6h35X28TE')
          .then((entry) => {
            // logs the entry metadata
            console.log(entry.sys)

            // logs the field with ID title
            console.log(entry.fields.title)
            var local_contentfulItems = {title:'', description:[]};
            local_contentfulItems.title = entry.fields.title;
            this.setState({contentfulItems:local_contentfulItems});
            //console.log(entry.fields.description)
          })
          .catch((err) => {
            console.log(err.message)
          })

      }

    render(){
        return <div>
                  <h2>{this.state.contentfulItems.title}</h2>
                  <p>Pricekite is a site providing information on cloud pricing.</p>
                  <p>This site was launched on August 23, 2019.</p>
                </div>;
    }
}
