
let taskinput = document.getElementById("taskinput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Show tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        let li = document.createElement("li");

        // Task text
        let taskText = document.createElement("span");
        taskText.innerText = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        // Done button
        let completeBtn = document.createElement("button");
        completeBtn.innerText = task.completed ? "Undo" : "Done";

        completeBtn.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";

        editBtn.addEventListener("click", function () {
            let newTask = prompt("Update task:", task.text);

            if (newTask !== null && newTask.trim() !== "") {
                tasks[index].text = newTask.trim();
                saveTasks();
                renderTasks();
            }
        });

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(taskText);
        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Add task
function addTask() {
    let task = taskinput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: task,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskinput.value = "";
}

// Button click
addBtn.addEventListener("click", addTask);

// Enter key
taskinput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Show saved tasks on page load
renderTasks();
