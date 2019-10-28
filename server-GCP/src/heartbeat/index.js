/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.heartbeat = (req, res) => {
  var heartbeat = {status: 'Alive'};
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).send(heartbeat);
};
