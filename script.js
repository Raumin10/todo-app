const taskinput =
document.getElementById("taskinput");
const addtaskbtn =
document.getElementById("addtaskbtn");
const tasklist =
document.getElementById("tasklist");
const counter =
document.querySelector("#task-counter");

let tasks = [];

addtaskbtn.addEventListener("click", addTask);

taskinput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskinput.value.trim();
    if (taskText === "") {
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    saveTasks();
    taskinput.value = "";
    renderTasks();
}

function renderTasks() {
    tasklist.innerHTML = "";
    tasks.forEach(function(task) {
        const listItem = document.createElement("li");
        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;
        if (task.completed) {
            taskSpan.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        taskSpan.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        function saveTasks() {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
        }

        renderTasks();
    }

function renderTodos() {
  counter.textContent =
    `${todos.length} ${todos.length === 1 ? "task" : "tasks"}`;

  list.replaceChildren();

  // Keep the rest of renderTodos() here