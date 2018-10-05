import chai from 'chai';
import services from '../../server/api/services';

const expect = chai.expect;

describe('Metrics', () => {
  it('should insert a node metric', done => {
    services.metrics.addNodeMetric({
      timeslice: 1,
      cpu:       1,
      mem:       1
    }, (err, metric) => {
      expect(err).to.be.null;
      expect(metric).to.exist;
      expect(Object.keys(metric)).to.have.members(['timeslice','cpu','mem','_id']);

      done(err);
    });
  });
});
