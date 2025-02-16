let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let searchQuery = "";

document.body.addEventListener("click", (e) => {
  const taskItem = e.target.closest(".task-item");
  if (!taskItem) return;

  const taskId = Number(taskItem.dataset.id);

  if (e.target.classList.contains("complete-btn")) {
    toggleComplete(taskId);
  } else if (e.target.classList.contains("delete-btn")) {
    deleteTask(taskId);
  }
});

document.getElementById("taskForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const taskInput = document.getElementById("taskInput");
  const taskPriority = document.getElementById("taskPriority").value;

  if (taskInput.value.trim()) {
    addTask({
      id: Date.now(),
      text: taskInput.value.trim(),
      priority: taskPriority,
      completed: false,
      createdAt: new Date(),
    });
    taskInput.value = "";
  }
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase();
  renderTasks();
});

document.getElementById("filterPriority").addEventListener("change", (e) => {
  currentFilter = e.target.value;
  renderTasks();
});

const addTask = (task) => {
  tasks.push(task);
  saveToLocalStorage();
  renderTasks();
};

const toggleComplete = (taskId) => {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveToLocalStorage();
  renderTasks();
};

const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveToLocalStorage();
  renderTasks();
};

const renderTasks = () => {
  const filteredTasks = tasks.filter(
    (task) =>
      (currentFilter === "all" || task.priority === currentFilter) &&
      (task.text.toLowerCase().includes(searchQuery) ||
        task.priority.toLowerCase().includes(searchQuery))
  );

  const renderList = (priority, containerId, showCompleted = false) => {
    document.getElementById(containerId).innerHTML = filteredTasks
      .filter(
        (task) => task.priority === priority && task.completed === showCompleted
      )
      .map(
        (task) => `
          <li class="task-item ${task.priority}-priority ${
          task.completed ? "completed" : ""
        }" data-id="${task.id}">
            <span style="flex-grow: 1">${task.text} <strong>(${
          task.priority
        })</strong></span>
            ${
              !task.completed
                ? `<button class="btn-complete complete-btn">Complete</button>`
                : ""
            }
            <button class="btn-delete delete-btn">Delete</button>
          </li>`
      )
      .join("");
  };

  renderList("high", "highPriorityList");
  renderList("medium", "mediumPriorityList");
  renderList("low", "lowPriorityList");

  document.getElementById("completedList").innerHTML = filteredTasks
    .filter((task) => task.completed)
    .map(
      (task) => `
        <li class="task-item completed" data-id="${task.id}">
          <span style="flex-grow: 1">${task.text} <strong>(${task.priority})</strong></span>
          <button class="delete-btn">Delete</button>
        </li>`
    )
    .join("");

  const incompleteCount = tasks.reduce(
    (count, task) => count + !task.completed,
    0
  );
  document.getElementById(
    "taskCount"
  ).textContent = `${incompleteCount} incomplete task${
    incompleteCount !== 1 ? "s" : ""
  }`;
};

const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

renderTasks();

const darkModeToggle = document.getElementById("darkModeToggle");
const toggleIcon = document.getElementById("toggleIcon");

const isDarkModePreferred = () => {
  return (
    localStorage.getItem("darkMode") === "true" ||
    (localStorage.getItem("darkMode") === null &&
      (new Date().getHours() >= 19 || new Date().getHours() < 7))
  );
};

const applyDarkMode = (enabled) => {
  document.body.classList.toggle("dark-mode", enabled);
  localStorage.setItem("darkMode", enabled);
  toggleIcon.src = enabled
    ? "/images/dark_mode_icon.png"
    : "/images/light_mode_icon.png";
};

applyDarkMode(isDarkModePreferred());

darkModeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-mode");
  applyDarkMode(!isDark);
});
