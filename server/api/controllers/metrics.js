import _ from 'lodash/fp';
import services from '../services';

const metrics = services.metrics;

/*
    POST /v1/metrics/node/{nodename}/
      ○ Accepts a JSON payload with properties:
        ■ “timeslice”: (float) number of seconds this measurement represents
        ■ “cpu”: (float) percentage used
        ■ “mem”: (float) percentage used
*/
function addNodeMetric(req, resp) {
  metrics.addNodeMetric(_.merge(req.params)(req.body), (err, metric) => {
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
      .status(201)
      .send(metric);
  });
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
  metrics.addNodeMetric(_.merge(req.params)(req.body), (err, metric) => {
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
      .status(201)
      .send(metric);
  });
}

export default {
  routes: [
    {
      type:    'post',
      path:    '/metrics/node/:nodeName',
      handler: addNodeMetric
    },

    {
      type:    'post',
      path:    '/metrics/nodes/:nodeName/process/:processName',
      handler: addProcessMetric
    }
  ]
};
