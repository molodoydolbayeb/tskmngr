// --- DOM Elements ---
const taskInput = document.getElementById('task-description');
const addTaskBtn = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list'); // ✅ исправлено


// Базовый URL бэкенда (должен совпадать с PORT в server.js)
const API_URL = 'http://localhost:3001/tasks'; // или 3002


// --- Function: создать элемент задачи ---
function createTaskElement(taskText, isCompleted = false, id = null) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  if (isCompleted) li.classList.add('completed');

  if (id) li.dataset.id = id;

  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('task-checkbox');
  checkbox.checked = isCompleted;
  checkbox.addEventListener('change', toggleTaskCompletion);

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskSpan.classList.add('task-text');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-button');
  deleteBtn.addEventListener('click', deleteTask);

  taskContent.appendChild(checkbox);
  taskContent.appendChild(taskSpan);

  li.appendChild(taskContent);
  li.appendChild(deleteBtn);

  return li;
}


// --- Загрузить задачи с бэкенда ---
async function loadTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    tasks.forEach(task => {
      const taskElement = createTaskElement(task.text, task.completed, task.id);
      taskList.appendChild(taskElement);
    });
  } catch (err) {
    console.error('Failed to load tasks', err);
  }
}


// --- Добавить новую задачу ---
async function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task description!');
    return;
  }

  const body = { text: taskText };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const newTask = await response.json();

  const taskElement = createTaskElement(newTask.text, newTask.completed, newTask.id);
  taskList.appendChild(taskElement);

  taskInput.value = '';
  taskInput.focus();
}


// --- Переключить статус задачи ---
async function toggleTaskCompletion(event) {
  const li = event.target.closest('li');
  const id = li.dataset.id;
  const completed = event.target.checked;

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed })
  });

  const updatedTask = await response.json();
  li.classList.toggle('completed', updatedTask.completed);
}


// --- Удалить задачу ---
async function deleteTask(event) {
  const li = event.target.closest('li');
  const id = li.dataset.id;

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  const result = await response.json();

  if (result.message === 'Task deleted') {
    taskList.removeChild(li);
  }
}


// --- Event Listeners ---
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});


// Загрузить задачи при старте страницы
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  taskInput.focus();
});
