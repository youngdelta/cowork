const limit = require('express-rate-limit');

exports.limiter = (windowMs, max, message) =>
	limit({
		windowMs: 60000,
		max: 5,
		delayMs: 1000,
		handler(req, res) {
			res.status(this.statusCode).json({
				code: this.statusCode,
				message: '1분에 5번 1초씩 요청가능',
			});
		},
	});
