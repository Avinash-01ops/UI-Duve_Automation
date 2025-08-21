const mongoose = require('mongoose');

let cachedConnection = null;

async function connectToDatabase(uri, options = {}) {
	if (cachedConnection) return cachedConnection;
	const defaultOptions = { maxPoolSize: 5 };
	cachedConnection = await mongoose.connect(uri, { ...defaultOptions, ...options });
	return cachedConnection;
}

async function disconnectFromDatabase() {
	if (!cachedConnection) return;
	await mongoose.disconnect();
	cachedConnection = null;
}

module.exports = { connectToDatabase, disconnectFromDatabase, mongoose };

