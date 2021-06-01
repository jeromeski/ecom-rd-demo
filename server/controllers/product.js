const slugify = require('slugify');
const Product = require('../models/product');

exports.create = async (req, res) => {
	console.log(req.body);
	try {
		req.body.slug = slugify(req.body.title);
		const newProduct = await new Product(req.body).save();
		res.json(newProduct);
	} catch (err) {
		console.log(err);
		res.status(400).send('Create category failed');
	}
};
