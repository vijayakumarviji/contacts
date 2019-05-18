import healthCheckController from '../controllers/health_check';
import SchemaValidateMiddleWare from '../middlewares/schema-validator';

const routes = (router) => {

    router.get('/health_check',
        healthCheckController.healthCheck,
        SchemaValidateMiddleWare.responseSchemaValidator()
    );

    return router;
}

export default routes;