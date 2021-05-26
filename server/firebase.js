var admin = require('firebase-admin');

var serviceAccount = require('./config/fbaseServiceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
