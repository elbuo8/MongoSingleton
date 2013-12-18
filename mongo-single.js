
var MongoClient = require('mongodb').MongoClient;

function MongoSingleton (addr, options, cb) {
  if (options instanceof Function) {
    cb = options;
    options = null;
  }
  if (addr === undefined) {
    if (cb !== undefined) cb('No address found');
    return new Error('No address found');
  }
  if (MongoSingleton.prototype._db !== undefined && MongoSingleton.prototype._addr === addr) return MongoSingleton.prototype._db;
  MongoClient.connect(addr, options, function (e, db) {
    MongoSingleton.prototype._db = db;
    MongoSingleton.prototype._addr = addr;
    if (cb !== undefined) cb(e, db);
  });
}

exports = module.exports = MongoSingleton;
