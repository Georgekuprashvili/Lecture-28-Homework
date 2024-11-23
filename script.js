let form = document.getElementById("form");
let ul = document.getElementById("ul");
let input = document.getElementById("input");

function updateDateTime() {
  let date = new Date();
  let formattedDate = date.toDateString();
  let formattedDateTime = `${formattedDate} ${date.toLocaleTimeString()}`;
  document.getElementById("date_time").textContent = formattedDateTime;
}
updateDateTime();
setInterval(updateDateTime, 1000);

function addTaskToList(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  let li = document.createElement("li");

  let date = new Date();
  let formattedDate = date.toDateString();
  let formattedDateTime = `${formattedDate} ${date.toLocaleTimeString()}`;

  let taskInfoContainer = document.createElement("div");
  taskInfoContainer.classList.add("task-info");

  let taskText = document.createElement("span");
  taskText.textContent = task;
  taskText.classList.add("task-text");

  let dateSpan = document.createElement("span");
  dateSpan.textContent = formattedDateTime;
  dateSpan.classList.add("date");

  taskInfoContainer.appendChild(taskText);
  taskInfoContainer.appendChild(dateSpan);

  li.appendChild(taskInfoContainer);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.width = "25px";
  checkbox.style.height = "25px";

  let removeButton = document.createElement("button");
  removeButton.style.backgroundColor = "white";
  removeButton.style.border = "0px";
  let icon = document.createElement("img");
  icon.src = "images/bin.svg";
  removeButton.prepend(icon);

  let checkboxDeleteContainer = document.createElement("div");
  checkboxDeleteContainer.classList.add("checkbox-delete-container");
  checkboxDeleteContainer.appendChild(checkbox);
  checkboxDeleteContainer.appendChild(removeButton);

  li.appendChild(checkboxDeleteContainer);

  ul.appendChild(li);

  removeButton.addEventListener("click", () => {
    li.remove();
    removeTaskFromStorage(task);
  });
}

function removeTaskFromStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToList(task));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let task = input.value.trim();
  if (task) {
    addTaskToList(task);
    input.value = "";
  }
});

document.addEventListener("DOMContentLoaded", loadTasks);
