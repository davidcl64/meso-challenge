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

/*
    GET /v1/analytics/processes/
      ○ Accepts a query parameter:
        ■ “timeslice” (float) seconds of history from the most recent POST to scan
      ○ Returns a JSON body with properties:
        ■ “timeslice”: (float) seconds duration represented by the timeslace
          ● How much time is covered in this report?
          ● Should be the lesser of:
            ○ The queried time-slice or its default
            ○ The available data for scanning reported processes
        ■ “processes”: (array) of objects with properties:
          ● “name”: (string) the name of each process
          ● “url”: (string) the URL of its individual resource, i.e.
            /v1/analytics/processes/{processname}/
*/
function listProcesses(req, resp) {
  /* eslint-disable no-void */
  void req;
  resp
    .status(501)
    .send({ message: 'Not Implemented' });
}

/*
    GET /v1/analytics/processes/{processname}/
      ○ Accepts a query parameter:
        ■ “timeslice” (float) seconds of history from the most recent POST to scan
      ○ Returns a JSON body with properties:
        ■ “timeslice”: (float) seconds duration represented by the timeslace
          ● How much time is covered in this report?
          ● Should be the lesser of:
            ○ The queried time-slice or its default
            ○ The available data for scanning for this process
        ■ “cpu_used”: (float) average percentage CPU usage over all nodes over
          the given timeslice
        ■ “mem_used”: (float) average percentage memory usage over all nodes
          over the given timeslice
        ■ “num_instances”: (int) how many distinct nodes reported this process
*/
function getProcess(req, resp) {
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
      path:    '/metrics/nodes/:nodename/process/:processname',
      handler: addProcessMetric
    },

    {
      type:    'get',
      path:    '/analytics/processes',
      handler: listProcesses
    },

    {
      type:    'get',
      path:    '/analytics/processes/:processname',
      handler: getProcess
    }
  ]
};
