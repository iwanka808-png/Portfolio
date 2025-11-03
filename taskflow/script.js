const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const newTask = { text, done: false };
  tasks.push(newTask);
  taskInput.value = "";
  saveAndRender();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");

    const btns = document.createElement("div");

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔";
    doneBtn.title = "Als erledigt markieren";
    doneBtn.onclick = () => toggleTask(i);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.title = "Löschen";
    delBtn.onclick = () => deleteTask(i);

    btns.appendChild(doneBtn);
    btns.appendChild(delBtn);
    li.appendChild(btns);
    taskList.appendChild(li);
  });
}

