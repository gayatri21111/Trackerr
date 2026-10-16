(function () {
  "use strict";

  const STORAGE_KEY = "task-tracker-tasks";

  // DOM references
  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");
  const errorMsg = document.getElementById("error-msg");
  const list = document.getElementById("task-list");
  const emptyMsg = document.getElementById("empty-msg");
  const totalEl = document.getElementById("total-count");
  const completedEl = document.getElementById("completed-count");
  const pendingEl = document.getElementById("pending-count");
  const viewBanner = document.getElementById("view-banner");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // State
  let tasks = loadTasks();
  let currentFilter = "all";

  /* ---------- Storage (1.3) ---------- */
  function loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      /* storage may be unavailable (private mode); app still works */
    }
  }

  /* ---------- Actions ---------- */
  // 1.1 Add task (empty tasks are blocked)
  function addTask(text) {
    tasks.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: text,
      completed: false,
    });
    saveTasks();
    render();
  }

  // 1.2 Toggle Completed / Pending
  function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      render();
    }
  }

  // 1.2 Delete
  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    render();
  }

  /* ---------- Rendering ---------- */
  function getVisibleTasks() {
    if (currentFilter === "completed") return tasks.filter((t) => t.completed);
    if (currentFilter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }

  function render() {
    // Stats (1.2)
    const completedCount = tasks.filter((t) => t.completed).length;
    totalEl.textContent = tasks.length;
    completedEl.textContent = completedCount;
    pendingEl.textContent = tasks.length - completedCount;

    // Filter banner (1.3)
    const labels = { all: "All Tasks", pending: "Pending Tasks", completed: "Completed Tasks" };
    viewBanner.textContent = "Current View: " + labels[currentFilter];

    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === currentFilter);
    });

    // List
    list.innerHTML = "";
    const visible = getVisibleTasks();

    visible.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task-item" + (task.completed ? " completed" : "");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", "Mark task as " + (task.completed ? "pending" : "completed"));
      checkbox.addEventListener("change", () => toggleTask(task.id));

      const span = document.createElement("span");
      span.className = "task-text";
      span.textContent = task.text; // textContent prevents HTML injection

      const badge = document.createElement("span");
      badge.className = "badge " + (task.completed ? "completed" : "pending");
      badge.textContent = task.completed ? "Completed" : "Pending";

      const del = document.createElement("button");
      del.className = "delete-btn";
      del.type = "button";
      del.setAttribute("aria-label", "Delete task");
      del.innerHTML = "&#128465;";
      del.addEventListener("click", () => deleteTask(task.id));

      li.append(checkbox, span, badge, del);
      list.appendChild(li);
    });

    list.hidden = visible.length === 0;
    emptyMsg.hidden = visible.length !== 0;
    emptyMsg.textContent =
      tasks.length === 0 ? "No tasks yet. Add your first task above!" : "No " + currentFilter + " tasks.";
  }

  /* ---------- Events ---------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = input.value.trim();

    if (!text) {
      errorMsg.hidden = false;
      input.classList.add("invalid");
      input.focus();
      return;
    }

    errorMsg.hidden = true;
    input.classList.remove("invalid");
    addTask(text);
    input.value = "";
    input.focus();
  });

  input.addEventListener("input", function () {
    if (input.value.trim()) {
      errorMsg.hidden = true;
      input.classList.remove("invalid");
    }
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  // Initial render
  render();
})();
