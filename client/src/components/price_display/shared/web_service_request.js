import {findRegionRecords} from '../shared/find_region_record.js';

export function webServiceRequest(ws, provider, callback)
{
  var xhr = new XMLHttpRequest();

  xhr.open('GET', ws);
  xhr.onload = () => {
      if(xhr.status === 200){
          console.log(xhr.responseText);
          var local_prices = {};
          local_prices = JSON.parse(xhr.responseText)
          if(provider == "AWS")
          {
            local_prices = JSON.parse(local_prices.body);
          }
          else if(provider == "Azure")
          {
            local_prices = JSON.parse(local_prices.body);
            local_prices = local_prices.Items;

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
