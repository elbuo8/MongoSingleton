
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
  if (MongoSingleton.prototype._dbs[addr] !== undefined) return MongoSingleton.prototype._dbs[addr];
  MongoClient.connect(addr, options, function (e, db) {
    if (db) MongoSingleton.prototype._dbs[addr] = db;
    if (cb !== undefined) cb(e, db);
  });
}

MongoSingleton.prototype._dbs = {};

exports = module.exports = MongoSingleton;
