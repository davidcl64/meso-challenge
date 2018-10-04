/*
    POST /v1/metrics/node/{nodename}/
      ○ Accepts a JSON payload with properties:
        ■ “timeslice”: (float) number of seconds this measurement represents
        ■ “cpu”: (float) percentage used
        ■ “mem”: (float) percentage used
*/
function addNodeMetric(req, resp) {
  /* eslint-disable no-void */
  void req;
  console.log('addNodeMetric called, responding with a 501');
  resp
    .status(501)
    .send({ message: 'Not Implemented' });
}

/*
    GET /v1/analytics/nodes/average
        ○ Accepts a query parameter:
          ■ “timeslice” (float) seconds of history from the most recent POST to scan
            for metrics data. Default to 60 seconds.
        ○ Returns a JSON body with properties:
          ■ “timeslice”: (float) seconds duration represented by the timeslace
            ● How much time is covered in this report?
            ● Should be the lesser of:
              ○ The queried time-slice or its default
              ○ The available data for scanning

          ■ “cpu_used”: (float) percentage average of all nodes CPU usage over the
            given timeslice
          ■ “mem_used”: (float) percentage average of all nodes memory usage over
            the given timeslice
*/
function getAverage(req, resp) {
  /* eslint-disable no-void */
  void req;
  resp
    .status(501)
    .send({ message: 'Not Implemented' });
}

export default {
  routes: [
    {
      type:    'post',
      path:    '/metrics/node/:nodename',
      handler: addNodeMetric
    },

    {
      type:    'get',
      path:    '/analytics/nodes/average',
      handler: getAverage
    }
  ]
};
