import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const expect = chai.expect;

describe('Analytics', () => {
  describe('POST /api/v1/metrics/nodes/:nodename/process/:processname', () => {
    it('should respone with 501', () =>
      request(Server)
        .post('/api/v1/metrics/nodes/bogusName/process/bogusProcess/')
        .send({
          timeslice: 0,
          cpu_used:  0,
          mem_used:  0
        })
        // .expect('Content-Type', /json/)
        .ok(res => res.status >= 0)
        .then(r => {
          expect(r.statusCode).to.equal(501);
          expect(r.body)
            .to.be.an.an('object');
        }));
  });

  describe('GET /analytics/processes', () => {
    it('should respond with a 501', () => {
      request(Server)
        .get('/api/v1/analytics/processes')
        .send()
        .ok(res => res.status >= 0)
        .then(r => {
          expect(r.statusCode).to.equal(501);
          expect(r.body)
            .to.be.an.an('object');
        });
    });
  });

  describe('GET /analytics/processes/:processname', () => {
    it('should respond with a 501', () => {
      request(Server)
        .get('/api/v1/analytics/processes/bogusName/')
        .send()
        .ok(res => res.status >= 0)
        .then(r => {
          expect(r.statusCode).to.equal(501);
          expect(r.body)
            .to.be.an.an('object');
        });
    });
  });
});
