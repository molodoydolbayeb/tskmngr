const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Главная страница API
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API works!' });
});

// Подключаем маршруты /tasks
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});