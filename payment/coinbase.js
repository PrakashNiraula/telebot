//'use strict';

var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;
Client.init('c60f1422-085c-4370-afbe-5cc184152b46');
module.exports=Client;