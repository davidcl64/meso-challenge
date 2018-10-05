import assert from 'assert';
import _ from 'lodash/fp';
import coreDB from './coreDB';

/*
 * Adds a single node metric to the database
 */
function addNodeMetric(metric, done) {
  coreDB.collection('NodeMetrics', (colErr, col) => {
    if (!colErr) {
      col.insertOne(_.merge({
        created:   Date.now(),
        startTime: Date.now() - (metric.timeslice * 1000)
      }, metric), (insertErr, result) => {
        let retVal = null;
        if (!insertErr) {
          // If this assertion fails, it is a programmer error and the service should fail hard
          assert(result.ops.length === 1, 'Single insert should never return multiple values');

          // Since this is a single add function, just grab the first item in the list
          // Currently leaving out the 'created' attribute
          retVal = _.omit(['created', 'startTime'], result.ops[0]);
        }

        done(insertErr, retVal);
      });
    } else {
      done(colErr);
    }
  });
}

/*
      ○ Accepts a JSON payload with properties:
        ■ “timeslice”: (float) number of seconds this measurement represents
        ■ “cpu_used”: (float) percentage of CPU time allocated to this process over
          the given time slice
        ■ “mem_used”: (float) megabytes of memory allocated to this process over
          the given time slice
*/
function addProcessMetric(metric, done) {
  coreDB.collection('ProcessMetrics', (colErr, col) => {
    if (!colErr) {
      col.insertOne(_.merge({
        created:   Date.now(),
        startTime: Date.now() - (metric.timeslice * 1000)
      }, metric), (insertErr, result) => {
        let retVal = null;
        if (!insertErr) {
          // If this assertion fails, it is a programmer error and the service should fail hard
          assert(result.ops.length === 1, 'Single insert should never return multiple values');

          // Since this is a single add function, just grab the first item in the list
          // Currently leaving out the 'created' attribute
          retVal = _.omit(['created', 'startTime'], result.ops[0]);
        }

        done(insertErr, retVal);
      });
    } else {
      done(colErr);
    }
  });
}


export default {
  addNodeMetric,
  addProcessMetric
};
