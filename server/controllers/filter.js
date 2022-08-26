const express = require('express');
const Filter = require('../models/Filter');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken')

const router = express.Router();

module.exports = () => {

	router.post('/', verifyToken, async (request, response) => {
		request.body.id = request.user.id;
		console.log(request.body)
		const results = await Filter.getFilterMatch(request.body);
		response.status(200).json({
		status: 'success',
		results: results.rows.length,
		data: { users: results.rows },
		});
	});

	return router;
}