/**
 * Promise는 어떠한 처리를 하되 당장 결과를 반환하지 않고 원할 때 결과를 가져 올 수 있는 객체입니다.
 *
 * */
const promise = new Promise((resolve, reject) => {
	if (true) {
		resolve('true');
	} else {
		reject('false');
	}
});

//then 메소드 사용 방법
promise
	.then((result) => {
		console.log(result);
	})
	.catch((result) => {
		console.log(result);
	})
	.finally(() => {
		console.log('finally...!');
	});

/**
 * 필요하다면 Promise는 then 안에서 또 다른 처리를 수행하여 다음 then으로 넘기는 체이닝을 구현하는 것도 가능합니다.
 *
 */
promise
	.then((result) => {
		console.log(result);

		return new Promise((resolve, reject) => {
			resolve(result);
		});
	})
	.then((result) => {
		console.log(result);
	})
	.catch((result) => {
		console.log(result);
	})
	.finally(() => {
		console.log('finally finished!!!');
	});

/**
 * Promise의 처리결과가 실패인지, 성공인지에 대한 결과가 명확하다면 Promise에서 resolve()나 reject() 메서드를 곧바로 호출해 결과를 받는 것도 가능하다.
 */
const promise1 = new Promise((resolve, reject) => {
	if (true) {
		resolve('true');
	} else {
		reject('false');
	}
});

const promise2 = new Promise((resolve, reject) => {
	if (true) {
		resolve('true');
	} else {
		reject('false');
	}
});

Promise.all([promise1, promise2]).then((result) => {
	console.log(result);
});

/**
 * async/await 을 all을 사용해 Promise의 결과를 한꺼번에 받아오는 경우 다믕과 같이 for of문으로 결과값을 순회할 수 있다.
 */
async () => {
	for (const p of [promise1, promise2]) {
		console.log(p);
	}
};
