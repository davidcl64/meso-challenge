// import chai from 'chai';
import mongo from '../../server/api/services';

// const expect = chai.expect;

describe('Core DB', done => {
  it('should connect to the database', () => {
    mongo.db( db => {

      db.listCollections()
        .toArray(cols => {
          console.dir(cols);
          done();
        });
    });
  });
});
