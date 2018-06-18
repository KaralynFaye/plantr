const { db } = require('./models');

db.sync({force: true})
	.then( () => {
		console.log('database synced!')
	})
	.catch( error => {
		console.log(error.message);
	})
	.finally( () => {
		console.log('finally');
		db.close();
	})