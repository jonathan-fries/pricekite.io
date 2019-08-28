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
  		console.log(response.body.url);
  		console.log(response.body.explanation);
        let message = response.body.explanation;
      	Defiant.getSnapshot(message, function(snapshot) {
  			// executed when the snapshot is created
  			found = JSON.search(snapshot, '//item');  
		});
      	console.log("It din bork!");
  		res.status(200).send(message);
	}).catch(error => {
  		console.log(error.response.body);
      	res.status(401).send("It borked!");
	});

};
