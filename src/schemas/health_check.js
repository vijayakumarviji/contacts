import joi from 'joi';
import { status } from './common';

export default {
    'get/health_check': {
        response: status
    }
};