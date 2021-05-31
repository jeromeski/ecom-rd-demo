//Create a Sub model just by requiring the module
const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
	const { name, parent } = req.body;
	// const duplicate = await Sub.findOne({ name });
	// console.log(duplicate);
	// if (name === duplicate.name) {
	// 	console.log('found dupe', true);
	// }
	try {
		res.json(
			await new Sub({
				name,
				parent,
				slug: slugify(name)
			}).save()
		);
	} catch {
		res.status(400).send('Create sub failed');
	}
};

exports.read = async (req, res) => {
	let sub = await Sub.findOne({ slug: req.params.slug }).exec();
	res.json(sub);
};

exports.update = async (req, res) => {
	const { name } = req.body;
	try {
		let updated = await Sub.findOneAndUpdate(
			// filter and retrieve doc using old slug
			{ slug: req.params.slug },
			// update name and parent, and generate new slug
			{ name, parent, slug: slugify(name) },
			{ new: true }
		).exec();
		res.json(updated);
	} catch (err) {
		res.json(err.message);
	}
};

exports.remove = async (req, res) => {
	try {
		const deleted = await Sub.findOneAndDelete({ slug: req.params.slug }).exec();
		// console.log(deleted);
		res.json(deleted);
	} catch (err) {
		res.json(err.message);
	}
};

exports.list = async (req, res) => {
	res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};
