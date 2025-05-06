// Array to store all task objects
let tasks = [];

// Unique task identifier (incremental)
let taskId = 0;

// Adds a new task from the input field to the task list.
function addTask() {
  const taskInput = document.getElementById("taskInput");
  // Trim to remove leading/trailing spaces
  const taskName = taskInput.value.trim();
  // Ignore empty or whitespace-only input
  if (!taskName) return;

  // Create a new task object and add it to the list
  tasks.push({
    id: taskId++, // Unique ID for each task
    name: taskName, // Task name from user input
    done: false, // Task is not done initially
  });

  taskInput.value = ""; // Clear the input field
  renderTaskList(); // Re-render the task list
}

/**
 * Renders the task list in the UI.
 * It clears the existing list and rebuilds it based on current task data.
 */
function renderTaskList() {
  const taskListElement = document.getElementById("taskList");
  taskListElement.innerHTML = ""; // Clear previous list

  // Loop through tasks and create list items
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Set the HTML content with Toggle and Delete buttons
    li.innerHTML = `
      ${task.name}
      <button class="bg-green" onclick="toggleTask(${index})">Toggle</button>
      <button class="bg-red" onclick="removeTask(${index})">Delete</button>
    `;

    // If task is marked as done, strike through the text
    if (task.done) {
      li.style.textDecoration = "line-through";
    }

    taskListElement.appendChild(li); // Add list item to the DOM
  });
}

/**
 * Toggles the "done" status of a task.
 * @param {number} index - Index of the task in the array
 */
function toggleTask(index) {
  if (!tasks[index]) return; // Avoid errors if index is invalid
  tasks[index].done = !tasks[index].done; // Toggle true/false
  renderTaskList(); // Refresh the list view
}

/**
 * Deletes a task from the list.
 * @param {number} index - Index of the task to be deleted
 */
function removeTask(index) {
  tasks.splice(index, 1); // Remove task from array
  renderTaskList(); // Re-render the list
}

/**
 * Checks if all tasks are marked as done.
 * Logs a message if all tasks are completed.
 */
function checkAllTasksDone() {
  if (tasks.length === 0) return; // Skip check if no tasks exist

  // Check if every task is marked as done
  const allDone = tasks.every((task) => task.done);

  if (allDone) {
    console.log("All tasks done!");
  }
}

// Periodically check every 10 seconds whether all tasks are completed
setInterval(checkAllTasksDone, 10000);
