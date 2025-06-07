// task.js
let tasks = [];
let editingId = null;

const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");

const getTasks = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
    tasks = await res.json();
    renderTasks(tasks);
};

const renderTasks = (tasksToRender) => {
    taskList.innerHTML = "";
    tasksToRender.forEach((task) => {
        const card = document.createElement("div");
        card.className = "task-card" + (task.completed ? " completed" : "");
        card.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.body}</p>
      <button onclick="markComplete(${task.id})">✅</button>
      <button onclick="editTask(${task.id})">📝</button>
      <button onclick="deleteTask(${task.id})">❌</button>
    `;
        taskList.appendChild(card);
    });
};

window.markComplete = async (id) => {
    const task = tasks.find(t => t.id === id);
    task.completed = true;
    renderTasks(tasks);
};

window.editTask = (id) => {
    const task = tasks.find(t => t.id === id);
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.body;
    editingId = id;
};

window.deleteTask = async (id) => {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks(tasks);
};

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const body = document.getElementById("description").value;

    if (editingId) {
        const task = tasks.find(t => t.id === editingId);
        task.title = title;
        task.body = body;
        editingId = null;
    } else {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({ title, body }),
            headers: { "Content-type": "application/json" },
        });
        const data = await res.json();
        data.completed = false;
        tasks.unshift(data);
    }

    taskForm.reset();
    renderTasks(tasks);
});

// Filters & Sort
document.getElementById("filter").addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "completed") {
        renderTasks(tasks.filter(t => t.completed));
    } else if (val === "incomplete") {
        renderTasks(tasks.filter(t => !t.completed));
    } else {
        renderTasks(tasks);
    }
});

document.getElementById("sort").addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "title") {
        renderTasks([...tasks].sort((a, b) => a.title.localeCompare(b.title)));
    } else {
        renderTasks([...tasks]);
    }
});

getTasks();
