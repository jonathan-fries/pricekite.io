import React from 'react';

export default class GoogleIpAddress extends React.Component{

  render(){
      return <table width="100%">
                <tbody>
                    <tr><td width="30%">In Use (Standard VM):</td><td>$2.88/month</td></tr>
                    <tr><td width="30%">In Use (Preemptible VM):</td><td>$1.44/month</td></tr>
                    <tr><td>Not in Use:</td><td>$7.20/month</td></tr>
                </tbody></table>;
          }

}
