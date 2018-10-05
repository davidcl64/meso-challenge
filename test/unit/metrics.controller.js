import chai from 'chai';
import request from 'supertest';
import Server from '../../server';
// import logIfError from './util';

const expect = chai.expect;

describe('Metrics', () => {
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
});
