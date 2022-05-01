//'use strict';

var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;
var Charge = coinbase.resources.Charge;
Client.init('c60f1422-085c-4370-afbe-5cc184152b46');


var firstChargeObj = new Charge({
	"description": "Mastering the Transition to the Information Age",
	"metadata": {
		"customer_id": "id_1",
		"customer_name": "Satoshi Nakamoto"
	},
	"name": "Test Name",
	"payments": [],
	"pricing_type": "no_price"
});


// firstChargeObj.save(function (error, response) {
// 	console.log('Created charge(callback)');
// 	console.log(response);
// 	console.log(error);

// 	if (response && response.id) {
// 		Charge.retrieve(response.id, function (error, response) {
// 			console.log('Retrived charge(callback)');
// 			console.log(response);
// 			console.log(error);
// 		});
// 	}
// });

module.exports=Client;