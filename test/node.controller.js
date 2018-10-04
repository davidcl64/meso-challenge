import chai from 'chai';
import request from 'supertest';
import Server from '../server';
// import logIfError from './util';

const expect = chai.expect;

describe('Node', () => {
  describe('POST /api/v1/metrics/node/:nodename', () => {
    it('should respone with 501', () =>
      request(Server)
        .post('/api/v1/metrics/node/bogusName/')
        .send({
          timeslice: 0,
          cpu:       0,
          mem:       0
        })
        .ok(res => res.status >= 0)
        .then(r => {
          expect(r.statusCode).to.equal(501);
          expect(r.body)
            .to.be.an.an('object');
        }));
  });

  describe('GET /api/v1/analytics/nodes/average', () => {
    it('should respond with a 501', () => {
      request(Server)
        .get('/api/v1/analytics/nodes/average')
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
