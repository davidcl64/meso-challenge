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
    POST /v1/metrics/nodes/{nodename}/process/{processname}/
      ○ Accepts a JSON payload with properties:
        ■ “timeslice”: (float) number of seconds this measurement represents
        ■ “cpu_used”: (float) percentage of CPU time allocated to this process over
          the given time slice
        ■ “mem_used”: (float) megabytes of memory allocated to this process over
          the given time slice
*/
function addProcessMetric(req, resp) {
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
      type:    'post',
      path:    '/metrics/nodes/:nodename/process/:processname',
      handler: addProcessMetric
    }
  ]
};
