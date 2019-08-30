/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.IpAddrPrices = (req, res) => {

  const got = require('got');

  var url = 'https://cloudbilling.googleapis.com/v1/services/6F81-5844-456A/skus?key=' + process.env.API_KEY;
	console.log('url = ' + url );

	got( url, { json: true }).then(response => {
      //console.log(response);
  		//console.log(response.body.url);
  		//console.log(response.body.explanation);
        console.log("OK, we got an answer.")
        var skus = response.body.skus;
        var skusReturned = skus.length;
        console.log(skusReturned);
        var i = null;
        var ipAddressSku = null;
      	for (i = 0; skusReturned > i; i += 1) {
          //console.log(skus[i].name);
      		if (skus[i].name === "services/6F81-5844-456A/skus/66A2-68EA-56BE") {
            ipAddressSku = JSON.parse(JSON.stringify(skus[i]));
            console.log("Found it.");
      			break;
      		}
      	}


        console.log('Define JSON:');
        var pricingJson = {};
        console.log (pricingJson);

        //if we have gotten the sku, we flatten the JSON for reasonability and consumption
        if(ipAddressSku)
        {
          //console.log("Add SkuId");
          pricingJson.skuId = ipAddressSku.skuId;
          //console.log (pricingJson)

          var pricingExpression = JSON.parse(JSON.stringify(ipAddressSku.pricingInfo[0].pricingExpression));

          //console.log(pricingExpression);
          pricingJson.nanos = JSON.parse(JSON.stringify(pricingExpression.tieredRates[1].unitPrice.nanos));
          //console.log (pricingJson);
          pricingJson.hourly = pricingJson.nanos/1000000000;
          //console.log (pricingJson);
          pricingJson.monthly = pricingJson.hourly * 24 * 30;
          //console.log (pricingJson);
          pricingJson. currencyCode = JSON.parse(JSON.stringify(pricingExpression.tieredRates[1].unitPrice.currencyCode));
        }

      console.log(pricingJson);
  		res.status(200).send(pricingJson);

	}).catch(error => {
  		//console.log(error.response.body);
      	res.status(401).send("It borked!");
	});

};
