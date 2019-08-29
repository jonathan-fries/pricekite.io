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
            var ipAddressSku = skus[i];
            console.log("Found it.");
      			break;
      		}
      	}

        var nanos;
        var hourly;
        var monthly;
        var pricingJson = "{Borked}";

        if(ipAddressSku)
        {
          console.log("We got one let's do something.")
          var pricingExpression = JSON.parse(JSON.stringify(ipAddressSku.pricingInfo.pricingExpression));
          console.log(pricingExpression);
          nanos = JSON.parse(JSON.stringify(pricingExpression.tieredRates[1].nanos));
          //hourly = nanos/1000000000;
          //monthly = hourly * 24 * 30;
          //pricingJson = "{'nanos':${nanos}, hourly: {$hourly}, monthly: {$monthly}}";
        }

      console.log(pricingJson);
  		res.status(200).send(pricingJson);

	}).catch(error => {
  		//console.log(error.response.body);
      	res.status(401).send("It borked!");
	});

};
