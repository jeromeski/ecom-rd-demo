var admin = require('firebase-admin');

var serviceAccount = require('../config/fbaseServiceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://ecom-rd-demo-default-rtdb.asia-southeast1.firebasedatabase.app'
});

module.exports = admin;
