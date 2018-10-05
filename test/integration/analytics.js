import chai from 'chai';
import services from '../../server/api/services';

const expect = chai.expect;

/* eslint-disable no-unused-expressions */
describe('Analytics', () => {
  describe('findLatestNodeMetric', () => {
    it('should find the latest node metric', done => {
      services.analytics.findLatestNodeMetric((err, metric) => {
        expect(err).to.be.null;
        expect(metric).to.exist;

        expect(Object.keys(metric)).to.have.members(['_id', 'created', 'startTime', 'timeslice', 'cpu', 'mem']);

        done(err);
      });
    });

    it('should fail if no node metrics are available');
    it('should probably have more tests');
  });

  describe('getNodeAverage', () => {
    it('should return the average for the given timeslice', done => {
      services.analytics.getNodeAverage(10, (err, avg) => {
        expect(Object.keys(avg)).to.have.members(['timeslice', 'cpu_used', 'mem_used']);
        done(err);
      });
    });

    it('should throw an exception if timeslice is not provided');
    it('needs more tests');
  });
});
