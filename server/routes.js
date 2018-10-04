import router from './api/controllers/';

export default function routes(app) {
  app.use('/api/v1', router);
}
