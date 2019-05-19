import contactsController from '../controllers/contacts';
import SchemaValidateMiddleWare from '../middlewares/schema-validator';

const routes = (router) => {

    // Create New Contact
    router.post('/contact',
        SchemaValidateMiddleWare.requestSchemaValidator(),
        contactsController.createContact,
        SchemaValidateMiddleWare.responseSchemaValidator()
    );

    // List Contact
    router.post('/contact/list',
        SchemaValidateMiddleWare.requestSchemaValidator(),
        contactsController.listOrSearchContact,
        SchemaValidateMiddleWare.responseSchemaValidator()
    );
    
    // Get Contact
    router.get('/contact/:_id',
        SchemaValidateMiddleWare.requestSchemaValidator(),
        contactsController.viewContact,
        SchemaValidateMiddleWare.responseSchemaValidator()
    );

    // Edit Contact
    router.put('/contact/:_id',
        SchemaValidateMiddleWare.requestSchemaValidator(),
        contactsController.editContact,
        SchemaValidateMiddleWare.responseSchemaValidator()
    );

    // Delete Contact
    router.delete('/contact/:_id',
        SchemaValidateMiddleWare.requestSchemaValidator(),
        contactsController.deleteContact,
        SchemaValidateMiddleWare.responseSchemaValidator()
    );
    return router;
}

export default routes;