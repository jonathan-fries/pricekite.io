import React from 'react';

export default class AzureIpAddress extends React.Component{

  render(){
      return  <table width="100%">
                <tbody><tr>
                  <td width="30%">ASM First 5:</td><td> $0/month</td></tr>
                  <tr><td width="30%">ASM Additional:</td><td> $2.59/month</td></tr>
                  <tr><td width="30%">Basic ARM First 5:</td><td> $2.88/month</td></tr>
                  <tr><td width="30%">Basic ARM Additional:</td><td> $5.76/month</td></tr>
                  <tr><td width="30%">Standard ARM All:</td><td> $3.60/month</td></tr>
                </tbody></table>;
          }
}
