const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return alert("Please enter a task!");

    const li = document.createElement("li");
    li.className = "task";
    li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="complete">✔</button>
      <button class="delete">✖</button>
    </div>
  `;

    li.querySelector(".complete").addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
    });

    taskList.appendChild(li);
    input.value = "";
}
