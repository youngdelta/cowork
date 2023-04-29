const express = require('express');
const app = express();
const { limiter } = require('./common/limit');

// const db = require('./models/index');
const db = require('./models');
const { Member } = db;

/*
리퀘스트의 바디에 들어있는 JSON 데이터를
req 객체의 body 프로퍼티에 설정하도록 했습니다.
*/
app.use(express.json());

let members = require('./data/picsum');
/* 
app.get('/', limiter, (req, res) => {
	res.send('<h1>Home</h1>');
});

 */ app.get('/api/members', limiter, (req, res) => {
	const { author } = req.query;
	(author && res.send(members.filter((m) => m.author == author))) ||
		res.send(members);
});

app.get('/api/members/:id', limiter, (req, res) => {
	const { id } = req.params;
	const member = members.find((m) => m.id === id);

	(member && res.send(`<img src="${member?.download_url}" alert="" />`)) ||
		res.status(404).send({ message: 'There is no such member' });

	// res.send(members);
});

app.post('/api/members', limiter, async (req, res) => {
	// console.log(req.body);
	const newMember = req.body;
	members.push(newMember);
	// res.send(newMember);
	res.send(await Member.findAll());
});

// 수정
app.put('/api/members/:id', limiter, (req, res) => {
	const { id } = req.params;
	const newInfo = req.body;
	const member = members.find((m) => m.id == id);
	(member &&
		(() => {
			Object.keys(newInfo).forEach(
				(prop) => (member[prop] = newInfo[prop]),
			);
			res.send(member);
		})()) ||
		res.status(404).send({ message: 'There is no such member' });
});

// 삭제

app.listen(3000, (_) => console.log('server Listening start...'));
