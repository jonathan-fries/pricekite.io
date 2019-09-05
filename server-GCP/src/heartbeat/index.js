/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.heartbeat = (req, res) => {
  var heartbeat;
  heartbeat.status = 'alive';
  res.status(200).send(heartbeat);
};
