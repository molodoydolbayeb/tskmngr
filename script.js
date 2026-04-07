// --- DOM Elements ---
const taskInput = document.getElementById('task-description');
const addTaskBtn = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// --- Functions ---

/**
 * Creates a new list item (<li>) HTML element for a task.
 * @param {string} taskText - The text content of the task.
 * @returns {HTMLElement} The created <li> element.
 */
function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.classList.add('task-item'); // Add class for general task item styling

  // Create container for checkbox and task text
  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  // Checkbox for task completion
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('task-checkbox');
  checkbox.addEventListener('change', toggleTaskCompletion); // Attach completion handler

  // Span to display task text
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskSpan.classList.add('task-text');

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-button');
  deleteBtn.addEventListener('click', deleteTask); // Attach delete handler

  // Assemble the task content (checkbox + text)
  taskContent.appendChild(checkbox);
  taskContent.appendChild(taskSpan);

  // Assemble the full list item (content + delete button)
  li.appendChild(taskContent);
  li.appendChild(deleteBtn);

  return li;
}

/**
 * Handles adding a new task to the list when the button is clicked or Enter is pressed.
 */
function addTask() {
  const taskText = taskInput.value.trim(); // Get text and remove leading/trailing whitespace

  if (taskText === "") {
    alert("Please enter a task description to add a new task!"); // User-friendly alert
    return; // Stop if input is empty
  }

  const newTaskElement = createTaskElement(taskText); // Create the new task's HTML element
  taskList.appendChild(newTaskElement); // Add it to the ul element

  taskInput.value = ""; // Clear the input field for the next task
  taskInput.focus(); // Keep focus on the input for quick consecutive additions
}

/**
 * Toggles the 'completed' class on a task item when its checkbox is changed.
 * @param {Event} event - The change event from the checkbox.
 */
function toggleTaskCompletion(event) {
  // Find the closest parent <li> element for the checkbox
  const li = event.target.closest('li');
  if (li) { // Ensure an <li> was found
    li.classList.toggle('completed'); // Toggle the 'completed' class for styling
  }
}

/**
 * Deletes a task item from the list when its delete button is clicked.
 * @param {Event} event - The click event from the delete button.
 */
function deleteTask(event) {
  // Find the closest parent <li> element for the delete button
  const li = event.target.closest('li');
  if (li) { // Ensure an <li> was found
    taskList.removeChild(li); // Remove the entire list item from the DOM
  }
}

// --- Event Listeners ---

// Listen for clicks on the 'Add Task' button
addTaskBtn.addEventListener('click', addTask);

// Listen for 'Enter' key presses in the task input field
taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask(); // Trigger addTask function
  }
});

// Optional: Focus the input field when the page loads
document.addEventListener('DOMContentLoaded', () => {
  taskInput.focus();
});
