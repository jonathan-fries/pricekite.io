

exports.ipAddressPrice = async (event) => {
    // TODO implement

    var params = {
      Filters: [
          {
            Field: "ServiceCode",
            Type: "TERM_MATCH",
            Value: "AmazonEC2"
           },
         {
        Field: "sku",
        Type: "TERM_MATCH",
        Value: "NA5BT4DMBGMMK5MT"
       }
      ],
      FormatVersion: "aws_v1",
      MaxResults: 25,
      ServiceCode: "AmazonEC2"
     };

    var AWS = require('aws-sdk');

    AWS.config.update({region: 'us-east-1'});

    var pricing = new AWS.Pricing();

    const promise = new Promise(function(resolve, reject) {

        pricing.getProducts(params, function (err, data) {

            if (err)
            {
                console.log(err, err.stack); // an error occurred
                reject(Error(err));
            }
            else
            {


                console.log("We got something.");
                var raw = data;
                var pricingJson = {};
                var onDemand;
                var priceDimensions;

                pricingJson.name = "Unused IP";
                pricingJson.sku = raw.PriceList[0].product.sku;

                //now it is time to parse some JSON
                //this BS is required because AWS puts periods in their flippin' JSON object names!
                onDemand = raw.PriceList[0].terms.OnDemand;
                priceDimensions = Object.values(onDemand)[0].priceDimensions;
                pricingJson.hourly = Object.values(priceDimensions)[0].pricePerUnit.USD;

                //pricingJson.hourly = raw.PriceList[0].terms.OnDemand.a.priceDimensions.a.pricePerUnit.USD;
                pricingJson.monthly = pricingJson.pricePerUnit * 24 * 30;

                var response = {
                    "statusCode": 200,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": JSON.stringify(pricingJson),
                    "isBase64Encoded": false
                };

                resolve(response);
            }// successful response
        });
    });
    return promise;
};
