// controllers/taskController.js

const db = require('../config/db');

// GET /tasks — получить все задачи
exports.getTasks = (req, res) => {
  db.all('SELECT id, text, completed FROM tasks', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// POST /tasks — добавить задачу
exports.addTask = (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid task text' });
  }

  const completed = false;

  db.run(
    'INSERT INTO tasks (text, completed) VALUES (?, ?)',
    [text, completed],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: this.lastID,
        text,
        completed
      });
    }
  );
};

// PUT /tasks/:id — обновить статус
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  db.run(
    'UPDATE tasks SET completed = ? WHERE id = ?',
    [completed ? 1 : 0, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
      res.json({ id, completed });
    }
  );
};

// DELETE /tasks/:id — удалить задачу
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  });
};