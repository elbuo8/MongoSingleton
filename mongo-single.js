
var MongoClient = require('mongodb').MongoClient;

function MongoSingle (addr, options, cb) {
  if (options instanceof Function) {
    cb = options;
    options = null;
  }
  if (addr === undefined) {
    if (cb !== undefined) cb('No address found');
    return new Error('No address found');
  }
  if (MongoSingle.prototype._db !== undefined && MongoSingle.prototype._addr === addr) return MongoSingle.prototype._db;
  MongoClient.connect(addr, options, function (e, db) {
    MongoSingle.prototype._db = db;
    MongoSingle.prototype._addr = addr;
    if (cb !== undefined) cb(e, db);
  });
}

exports = module.exports = MongoSingle;
