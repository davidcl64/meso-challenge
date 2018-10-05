import coreDB from './coreDB.js';
import assert from 'assert';

/*
 * Adds a single node metric to the database
 */
function addNodeMetric(metric, done) {
  coreDB.collection('NodeMetrics', (err, col) => {
    if (!err) {
      col.insert(metric, (err, result) => {
        let retVal = null;
        if (!err) {
          // If this assertion fails, it is a programmer error and the service should fail hard
          assert(result.ops.length = 1, 'Single insert should never return multiple values');

          // Since this is a single add function, just grab the first item in the list
          retVal = result.ops[0];
        }

        done(err, retVal);
      });
    } else {
      done(err);
    }
  });
}

export default {
  addNodeMetric
};
