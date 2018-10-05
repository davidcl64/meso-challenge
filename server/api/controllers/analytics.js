import services from '../services';

const analytics = services.analytics;

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
  // Default timeslice to 60 seconds.  Swagger should enforce this, but for readability here...
  const timeslice = req.params.timeslice || 60;

  analytics.getNodeAverage(timeslice, (err, avg) => {
    if (err) {
      // To do: Flesh out error handling mappings to response codes.
      resp
        .status(500)
        .send({
          message: 'An unknown error has occured',
          detail:  err.message
        });
      return;
    }

    resp
      .status(200)
      .send(avg);
  });
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
      type:    'get',
      path:    '/analytics/nodes/average',
      handler: getAverage
    },

    {
      type:    'get',
      path:    '/analytics/processes',
      handler: listProcesses
    },

    {
      type:    'get',
      path:    '/analytics/processes/:processName',
      handler: getProcess
    }
  ]
};
