
var MongoClient = require('mongodb').MongoClient;

function MongoSingle (addr, options) {
  console.log(addr);
  if (addr === undefined) addr = process.env.MONGO_URL;
  if (MongoSingle.prototype._db && MongoSingle.prototype._addr === addr && MongoSingle.prototype._options == options) return MongoSingle.prototype._db;
  MongoClient.connect(addr, options, function (e, db) {
    if (e) return null;
    MongoSingle.prototype._db = db;
    MongoSingle.prototype._addr = addr;
    MongoSingle.prototype._options = options;
    return db;
  });
}

exports = module.exports = MongoSingle;
