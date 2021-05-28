//Create a Category model just by requiring the module
const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res) => {
	const { name } = req.body;
	try {
		res.json(
			await new Category({
				name,
				slug: slugify(name)
			}).save()
		);
	} catch {
		res.status(400).send('Create category failed');
	}
};

exports.read = async (req, res) => {
	let category = await Category.findOne({ slug: req.params.slug }).exec();
	res.json(category);
};

exports.update = async (req, res) => {
	const { name } = req.body;
	try {
		let updated = await Category.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, slug: slugify(name) },
			{ new: true }
		).exec();
		res.json(updated);
	} catch (err) {
		res.json(err.message);
	}
};

exports.remove = async (req, res) => {
	try {
		const deleted = await Category.findOneAndDelete({ slug: req.params.slug }).exec();
		console.log(deleted);
		res.json(deleted);
	} catch (err) {
		res.json(err.message);
	}
};

exports.list = async (req, res) => {
	res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};
