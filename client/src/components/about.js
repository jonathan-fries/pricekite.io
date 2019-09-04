import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default class About extends React.Component{

  constructor(props){
        super(props);
        this.state = {contentfulItems:{ title: 'About Pricekite', descriptions:[]}};

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
            console.log(entry.fields.description)
            local_contentfulItems.description = entry.fields.description;

            //var i = 0;

            //for(i; i < entry.fields.description.content.length; i++)
            //{
            //  local_contentfulItems.description[i] = entry.fields.description.content[i].content[0].value;
            //}

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
                </div>;
    }
}
