const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const tasks = [];

app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

	if (request.method === 'OPTIONS') {
		return response.sendStatus(204);
	}

	next();
});

app.use(express.json());

app.get('/', (request, response) => {
	response.json({ name: 'task-manager-ai', status: 'ok' });
});

app.get('/api/tasks', (request, response) => {
	response.json(tasks);
});

app.post('/api/tasks', (request, response) => {
	const { title, description = '', completed = false } = request.body;

	if (typeof title !== 'string' || title.trim() === '') {
		return response.status(400).json({ error: 'title is required' });
	}

	if (typeof description !== 'string' || typeof completed !== 'boolean') {
		return response.status(400).json({
			error: 'description must be a string and completed must be a boolean',
		});
	}

	const task = {
		id: tasks.length + 1,
		title: title.trim(),
		description,
		completed,
		createdAt: new Date().toISOString(),
	};

	tasks.push(task);
	return response.status(201).json(task);
});

app.use((request, response) => {
	response.status(404).json({ error: 'Not found' });
});

if (require.main === module) {
	app.listen(port, '0.0.0.0', () => {
		console.log(`Task manager API listening on port ${port}`);
	});
}

module.exports = app;
