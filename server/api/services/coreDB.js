import URL from 'url';
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
let client = false;
let database = false;
let retryCount = 5;

/*
 * Ensure that we utilize mongo's connection pooling capabilities
 */
function db(done) {
  if (database) {
    process.nextTick(() => { done(null, database); });
    return;
  }

  console.info('Attempting to connect to: %s', process.env.MONGO_DB);

  client = new MongoClient(process.env.MONGO_DB);
  client.connect(err => {
    if (err) {
      if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
        console.info(new Date(), String(err));

        retryCount -= 1;

        // early return for a retry
        if (retryCount) {
          console.info('Retrying connect in a bit...');
          setTimeout(() => { db(done); }, 1000);
          return;
        }
      }

      // Otherwise we are done with retries, or the error was something else...
      done(err);
      return;
    }

    // Parse the database name out of the provided URL path
    const url = URL.parse(process.env.MONGO_DB);
    database = client.db(url.pathname.split('/')[1]);

    done(null, database);
  });
}

/*
 * Returns a mongo collection object.
 *
 * Abstracts that retrieval of a db object from the MongoClient
 * so db can be easily stubbed out for unit tests.
 */
function collection(name, done) {
  /* eslint-disable no-use-before-define */

  // Use module.exports here so db can be easily stubbed
  // out for unit tests
  exposed.db((err, _db) => {
    if (err) { done(err); return; }

    _db.collection(name, done);
  });
}

const exposed = {
  _: {
    mongoDB:     mongodb,
    mongoClient: MongoClient,
    client,
    database
  },
  db,
  collection
};

export default exposed;