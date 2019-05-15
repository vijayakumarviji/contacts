import contactController from '../controllers/health_check';

const routes = (router) => {

    router.get('/health_check', contactController.healthCheck);

    return router;
}

export default routes;