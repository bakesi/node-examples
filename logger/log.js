/**
 *  Example of a module import
 */

const logger = require('./logger.js');

logger.log('test');
logger.log('test');

const infoLogger = logger.Logger('INFO');

infoLogger.log('info log');


logger.log('test');
logger.log('test');
