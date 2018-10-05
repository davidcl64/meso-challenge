import assert from 'assert';
import _ from 'lodash/fp';
import coreDB from './coreDB';

function findLatestNodeMetric(done) {
  coreDB.collection('NodeMetrics', (colErr, col) => {
    if (!colErr) {
      col
        .find()
        .sort({ created: -1 })
        .limit(1)
        .toArray((findErr, findResult) => {
          done(findErr, (findResult || [])[0]);
        });
    } else {
      done(colErr);
    }
  });
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
function getNodeAverage(timeslice, done) {
  assert(timeslice > 0, 'Timeslice must be greater than zero');

  findLatestNodeMetric((err, latestMetric) => {
    if (err) {
      done(err);
      return;
    }

    coreDB
      .collection('NodeMetrics', (colErr, col) => {
        if (colErr) {
          done(colErr);
          return;
        }

        // Convert from incoming seconds to millis and substract to find the time period
        const period = latestMetric.created - (timeslice * 1000);

        // Query for records where the start time is within the period, otherwise
        // the result can contain records whos total time includes results from
        // outside the requested period.
        col
          .find({ startTime: { $gte: period } })
          .sort({ created: -1 })
          .toArray((findErr, findResult) => {
            if (err) {
              done(err);
              return;
            }

            const numRecords = findResult.length;
            const sums = _.reduce((current, totals) => ({
              timeslice: current.timeslice + totals.timeslice,
              cpu:       current.cpu + totals.cpu,
              mem:       current.mem + totals.mem
            }), { timeslice: 0, cpu: 0, mem: 0 })(findResult);

            done(findErr, findErr ? null : {
              timeslice: sums.timeslice,
              cpu_used:  sums.cpu / numRecords,
              mem_used:  sums.mem / numRecords
            });
          });
      });
  });
}

export default {
  findLatestNodeMetric,
  getNodeAverage
};