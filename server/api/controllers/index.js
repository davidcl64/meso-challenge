import _ from 'lodash/fp';
import * as express from 'express';
import node from './node';
import process from './process';

const router = express.Router();

_.concat(node.routes, process.routes)
  .forEach(route => {
    router[route.type](route.path, route.handler);
  });

export default router;
