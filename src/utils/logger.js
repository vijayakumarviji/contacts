import Winston from 'winston';

import Config from '../../config/index';

const log = Winston.createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5
    },
    defaultMeta: { service: 'contacts' },
    transports: [
        new Winston.transports.File({ filename: Config.LOGGER.FILENAME })
    ]
});

export default log;