const express = require('express');
const cors = require('cors');
const path = require('path');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
const adapter = new JSONFile(path.join(__dirname, 'db.json'));
const db = new Low(adapter);

app.get('/tasks', async (req, res) => {
  await db.read();
  res.json(db.data?.tasks || []);
});

app.post('/tasks', async (req, res) => {
  await db.read();
  db.data ||= { tasks: [] };
  const newTask = { id: Date.now(), ...req.body };
  db.data.tasks.push(newTask);
  await db.write();
  res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
  await db.read();
  db.data.tasks = db.data.tasks.filter(t => t.id != req.params.id);
  await db.write();
  res.json({ success: true });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running!');
});;