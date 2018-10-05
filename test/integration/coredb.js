import chai from 'chai';
import services from '../../server/api/services';

const expect = chai.expect;

describe('Core DB', () => {
  it('should connect to the database', done => {
    services.coreDB.db( (err, db) => {
      expect(err).to.be.null;

      db.listCollections()
        .toArray(cols => {
          console.dir(cols);
          done();
        });
    });
  });
});
