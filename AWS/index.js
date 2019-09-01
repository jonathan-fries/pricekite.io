

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
        Field: "productFamily",
        Type: "TERM_MATCH",
        Value: "IP Address"
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
                console.log("We got something, let us print it.");
                console.log(data);
                resolve(data);
            }// successful response
        });
    });
    return promise;
};
