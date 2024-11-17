const nano = require('nano');
require('dotenv').config();
const couch = nano(process.env.COUCHDB_URL || 'http://127.0.0.1:5984');
module.exports = couch;