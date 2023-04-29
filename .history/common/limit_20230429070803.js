const limit = require('express-rate-limit');

exports.limiter = (windowMs, max, message) =>
	limit({
		windowMs: 60000,
		max: 55,
		delayMs: 1000,
		handler(req, res, next) {
			res.status(this.statusCode).json({
				code: this.statusCode,
				message:
					'1분에 55번 1초씩 요청가능.(1초에 55번 이상 요청 금지합니다.)',
			});
			next(new CustomError(429, message)); //에러헨들러를 통해 메시지와 에러 상태 코드가 전달되도록 세팅
		},
	});
