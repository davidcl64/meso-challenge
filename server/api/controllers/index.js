import _ from 'lodash/fp';
import * as express from 'express';
import analytics from './analytics';
import metrics from './metrics';

const router = express.Router();

_.concat(analytics.routes, metrics.routes)
  .forEach(route => {
    router[route.type](route.path, route.handler);
  });

export default router;
