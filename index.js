const form = document.getElementById("form");
let todo_ul = document.getElementById("todo-ul");
let completed_ul = document.getElementById("completed-ul");
const dropdown = document.getElementById("priority");
let savedTodo = [];
let savedCompleted = [];

document.addEventListener("DOMContentLoaded", () => {});

dropdown.addEventListener("change", (event) => {
  dropdown.className =
    event.target.options[event.target.options.selectedIndex].value;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = event.target[0].value;
  const [year, month, day] = event.target[1].value.split("-");
  const priority = event.target[2].value;
  // const formattedDateString = `${formattedMonth}-${formattedDay}-${formattedYear}`;
  let formattedDateString = "";

  if (year && month && day) {
    const formattedDate = new Date(year, month - 1, day);

    const formattedMonth = String(formattedDate.getMonth() + 1).padStart(
      2,
      "0"
    );
    const formattedDay = String(formattedDate.getDate()).padStart(2, "0");
    const formattedYear = formattedDate.getFullYear();
    formattedDateString = `${formattedMonth}-${formattedDay}-${formattedYear}`;
  }

  const data = {
    task,
    priority,
    formattedDateString,
  };
  const div = createDiv(data);
  todo_ul.appendChild(div);
  event.target.reset();
});

function createDiv(data) {
  const div = document.createElement("div");
  div.classList.add(`li-container`, data.priority ? data.priority : "neutral");
  div.addEventListener("mouseenter", addDeleteBtn);

  div.addEventListener("mouseleave", removeDeleteBtn);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", checkItem);

  const li = document.createElement("li");
  li.textContent = data.task;

  div.appendChild(checkbox);
  div.appendChild(li);

  const dateP = document.createElement("p");
  dateP.classList.add("date");
  if (data.formattedDateString) {
    dateP.textContent = `Due Date: ${data.formattedDateString}`;
    dateP.style.margin = 0;
  }
  div.appendChild(dateP);

  return div;
}

function checkItem(event) {
  const parentDiv = event.target.parentElement;
  const li = parentDiv.children[1];
  const dateP = parentDiv.children[2];

  if (event.target.checked) {
    const audio = new Audio("./assets/tada-fanfare-a-6313.mp3");
    audio.play();
    li.style.textDecoration = "line-through";
    dateP.style.textDecoration = "line-through";
    parentDiv.style.color = "#c8c8c8";
    parentDiv.classList.add("completed");
    completed_ul.append(parentDiv);
  } else {
    const audio = new Audio("./assets/trumpet-e4-14829.mp3");
    audio.play();
    parentDiv.style.color = "";
    todo_ul.append(parentDiv);
    li.style.textDecoration = "none";
    parentDiv.classList.remove("completed");
    dateP.style.textDecoration = "none";
  }
}

function addDeleteBtn(event) {
  const i = document.createElement("i");
  i.style.cursor = "pointer";
  i.classList.add("bi", "bi-trash3-fill", "delete-btn");

  i.addEventListener("click", deleteTask);

  event.target.appendChild(i);
}

function removeDeleteBtn(event) {
  event.target.removeChild(event.target.querySelector("i.delete-btn"));
}

function deleteTask(event) {
  const audio = new Audio("./assets/crumple-03-40747.mp3");
  audio.play();
  const task = event.target.parentElement;
  task.remove();
}
