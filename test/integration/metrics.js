import chai from 'chai';
import services from '../../server/api/services';

const expect = chai.expect;

/* eslint-disable no-unused-expressions */
describe('Metrics', () => {
  it('should insert a node metric', done => {
    services.metrics.addNodeMetric({
      timeslice: 1,
      cpu:       1,
      mem:       1
    }, (err, metric) => {
      expect(err).to.be.null;
      expect(metric).to.exist;
      expect(Object.keys(metric)).to.have.members(['timeslice', 'cpu', 'mem', '_id']);

      done(err);
    });
  });

  it('should insert a process metric', done => {
    services.metrics.addProcessMetric({
      timeslice: 1,
      cpu_used:  1,
      mem_used:  1
    }, (err, metric) => {
      expect(err).to.be.null;
      expect(metric).to.exist;
      expect(Object.keys(metric)).to.have.members(['timeslice', 'cpu_used', 'mem_used', '_id']);

      done(err);
    });
  });
});
