import groupsController from '../controllers/groups';
import SchemaValidateMiddleWare from '../middlewares/schema-validator';

const routes = (router) => {

    // Create New Group
    router.post('/group',
        SchemaValidateMiddleWare.requestSchemaValidator(),
        groupsController.createGroup,
        SchemaValidateMiddleWare.responseSchemaValidator()
    ); 

    // List Group
    router.post('/group/list',
        SchemaValidateMiddleWare.requestSchemaValidator(),
        groupsController.listOrSearchGroup,
        SchemaValidateMiddleWare.responseSchemaValidator()
    ); 

    // View Group
    router.get('/group/:_id',
        SchemaValidateMiddleWare.requestSchemaValidator(),
        groupsController.viewGroup,
        SchemaValidateMiddleWare.responseSchemaValidator()
    ); 

    // Edit Group
    router.put('/group/:_id',
        SchemaValidateMiddleWare.requestSchemaValidator(),
        groupsController.editGroup,
        SchemaValidateMiddleWare.responseSchemaValidator()
    ); 

    // Delete Group
    router.delete('/group/:_id',
        SchemaValidateMiddleWare.requestSchemaValidator(),
        groupsController.deleteGroup,
        SchemaValidateMiddleWare.responseSchemaValidator()
    ); 
    return router;
}

export default routes;