import chai from 'chai';
import request from 'supertest';
import Server from '../../server';
// import logIfError from './util';

const expect = chai.expect;

describe('Metrics', () => {
  describe('POST /api/v1/metrics/node/:nodename', () => {
    it('should respone with 201', () =>
      request(Server)
        .post('/api/v1/metrics/node/bogusName/')
        .send({
          timeslice: 0,
          cpu:       0,
          mem:       0
        })
        .ok(res => res.status >= 0)
        .then(r => {
          expect(r.statusCode).to.equal(201);
          expect(r.body).to.be.an.an('object');
          expect(r.body).to.include.all.keys(['nodeName', 'timeslice', 'cpu', 'mem', '_id']);
        }));

    it('should fail if timeslice is missing');
    it('should faile if cpu is missing');
    it('should faile if mem is missing');
    it('should fail if the database responds with an error');
  });

  describe('POST /api/v1/metrics/nodes/:nodename/process/:processname', () => {
    it('should respone with 201', () =>
      request(Server)
        .post('/api/v1/metrics/nodes/bogusName/process/bogusProcess/')
        .send({
          timeslice: 0,
          cpu_used:  0,
          mem_used:  0
        })
        .ok(res => res.status >= 0)
        .then(r => {
          expect(r.statusCode).to.equal(201);
          expect(r.body).to.be.an.an('object');
          expect(r.body).to.include.all.keys(['nodeName', 'processName', 'timeslice', 'cpu_used', 'mem_used', '_id']);
        }));

    it('should fail if timeslice is missing');
    it('should faile if cpu_used is missing');
    it('should faile if mem_used is missing');
    it('should fail if the database responds with an error');
  });
});
