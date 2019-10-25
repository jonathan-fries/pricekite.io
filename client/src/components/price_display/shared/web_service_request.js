import {findRegionRecords} from '../shared/find_region_record.js';

export function webServiceRequest(ws, body, callback)
{
  var xhr = new XMLHttpRequest();

  xhr.open('GET', ws);
  xhr.onload = () => {
      if(xhr.status === 200){
          console.log(xhr.responseText);
          var local_prices = {};
          if(body)
          {
            local_prices = JSON.parse(xhr.responseText);
            local_prices = JSON.parse(local_prices.body);
          }
          else
          {
            local_prices = JSON.parse(xhr.responseText)
          }

          var local_price = findRegionRecords(1000, local_prices);

          callback(true, local_price, local_prices);
      }
      else{
          console.log("Error calling web service.");
          callback(false);
      }
  };
  xhr.send();

  return xhr;

}
