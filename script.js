const taskInput = document.getElementById('task-description');
const addTaskBtn = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li.task-item').forEach(li => {
    tasks.push({
      text: li.querySelector('.task-text').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(taskText, isCompleted = false) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  if (isCompleted) {
    li.classList.add('completed');
  }

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

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task description!');
    return;
  }

  const newTaskElement = createTaskElement(taskText);
  taskList.appendChild(newTaskElement);
  saveTasks();

  taskInput.value = '';
  taskInput.focus();
}

function toggleTaskCompletion(event) {
  const li = event.target.closest('li');
  if (li) {
    li.classList.toggle('completed');
    saveTasks();
  }
}

function deleteTask(event) {
  const li = event.target.closest('li');
  if (li) {
    taskList.removeChild(li);
    saveTasks();
  }
}

function loadTasks() {
  const tasksJSON = localStorage.getItem('tasks');
  if (!tasksJSON) return;

  const tasks = JSON.parse(tasksJSON);
  tasks.forEach(task => {
    const taskElement = createTaskElement(task.text, task.completed);
    taskList.appendChild(taskElement);
  });
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  taskInput.focus();
});
