import {
    buildResponseMessage
} from '../utils/utilities';

const HEALTH_CHECK = {
    RES_SUCCESS: buildResponseMessage('Health Check Success', 200),
    RES_INTERNAL_SERVER_ERR: buildResponseMessage('Internal Server Error', 500),
    RES_CUSTOM_ERROR: buildResponseMessage
};

export default {
    'get/health_check': HEALTH_CHECK
}