import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
    prettyPrint: true,
    base: {
        pid: true
    },
    timestamp: () => `, "time": "${dayjs().format()}"`
});

export default log;

/* export default log;

const logger = require('pino')
const dayjs = require('dayjs')

exports.log = logger({
    prettyPrint: true,
    base: {
        pid: false
    },
    timestamp: () => `, "time": "${dayjs().format()}"`
})

 *///export default log;