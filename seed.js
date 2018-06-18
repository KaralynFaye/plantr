const { db } = require('./models');
const { Gardener } = require('./models');
const { Vegetable } = require('./models');
const { Plot } = require('./models');
const { PlotVegetable } = db.model('plot_vegetable')

let date = new Date();
db.sync({force: true})
	.then( () => {
		console.log('database synced!')
	})
	.then(() => {
		let pump = Vegetable.create({
			name: 'Pumpkin',
			color: 'Orange',
			planted_on: date
		})

		let coll = Vegetable.create({
			name: 'Collard Greens',
			color: 'Green',
			planted_on: date
		})

		let sweet = Vegetable.create({
			name: "Sweet Potato",
			color: "Orange",
			planted_on: date
		})

		return Promise.all([pump, coll, sweet])
	})
	 .then((vegetables)=> {
	 	let Blitz = Gardener.create({
	 		name: 'Blitz',
	 		age: 8,
	 		favVegId: vegetables[2].id
	 	})
	 	let Madison = Gardener.create({
	 		name: 'Madison',
	 		age: 5,
	 		favVegId: vegetables[0].id
	 	})
	 	let Nala = Gardener.create({
	 		name: 'Nala',
	 		age: 2,
	 		favVegId: vegetables[1].id
	 	})

	 	return Promise.all([Blitz, Madison, Nala])
	 })
	 .then((gardeners)=>{
	 		let plot1 = Plot.create({
	 			size: 5,
	 			shaded: true,
	 			gardenerId: gardeners[0].id
	 		})
	 		let plot2 = Plot.create({
	 			size: 6,
	 			shaded: false,
	 			gardenerId: gardeners[1].id
	 		})
	 		let plot3 = Plot.create({
	 			size: 4,
	 			shaded: true,
	 			gardenerId: gardeners[2].id
	 		})
	 		return Promise.all([plot1, plot2, plot3])
	 })
	 .then((plots)=>{

	 })
	.catch( error => {
		console.log(error.message);
	})
	.finally( () => {
		console.log('finally');
		db.close();
	})


