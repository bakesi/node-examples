/**
 *  Example of a module export
 */

function Logger(name) {
  if (!new.target) {
    return new Logger(name); // To make sure that an instance is created when called without `new`
  }
  this.count = 0;
  this.name = name;
}

Logger.prototype.log = function(message) {
  this.count++;
  console.log(`[${this.name}: ${this.count}] ${message}`);
}

module.exports = new Logger('DEFAULT');
module.exports.Logger = Logger;
