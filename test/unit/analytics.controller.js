import chai from 'chai';
import request from 'supertest';
import Server from '../../server';

const expect = chai.expect;

describe('Analytics', () => {
  describe('GET /api/v1/analytics/nodes/average', () => {
    it('should respone with 200', () =>
      request(Server)
        .get('/api/v1/analytics/nodes/average')
        .send()
        // .expect('Content-Type', /json/)
        .ok(res => res.status >= 0)
        .then(r => {
          expect(r.statusCode).to.equal(200);
          expect(r.body).to.be.an.an('object');
        }));

    it('should default to 60 seconds');
    it('should fail with a reasonable status code when ...');
    it('should return an error if the request results in no metrics for the request');
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
