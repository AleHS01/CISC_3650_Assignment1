const form = document.getElementById("form");
let todo_ul = document.getElementById("todo-ul");
let completed_ul = document.getElementById("completed-ul");
const dropdown = document.getElementById("priority");

document.addEventListener("DOMContentLoaded", () => {});

dropdown.addEventListener("change", (event) => {
  dropdown.className =
    event.target.options[event.target.options.selectedIndex].value;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = getFormData(event);

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("main-li-conainter");

  const div = createDiv(data);

  mainDiv.appendChild(div);
  todo_ul.appendChild(mainDiv);
  event.target.reset();
});

function getFormData(event) {
  const task = event.target[0].value;
  const [year, month, day] = event.target[1].value.split("-");
  const priority = event.target[2].value;

  let formattedDateString = "";

  if (year && month && day) {
    formattedDateString = getFormattedDay(year, month, day);
  }

  return { task, priority, formattedDateString };
}

function createDiv(data) {
  const div = document.createElement("div");
  div.classList.add(`li-container`, data.priority ? data.priority : "neutral");

  div.addEventListener("mouseenter", addSubTaskBtn);
  div.addEventListener("mouseenter", addDeleteBtn);
  div.addEventListener("mouseleave", removeSubTaskBtn);
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
  const mainParent = parentDiv.parentElement;

  if (event.target.checked) {
    const audio = new Audio("./assets/tada-fanfare-a-6313.mp3");
    audio.play();
    li.style.textDecoration = "line-through";
    dateP.style.textDecoration = "line-through";
    parentDiv.style.color = "#c8c8c8";
    parentDiv.classList.add("completed");
    completed_ul.append(mainParent);

    const subtasks = mainParent.querySelectorAll(".subtask-container");
    subtasks.forEach((subtask) => {
      subtask.children[0].checked = true;
      subtask.classList.add("completed");
    });
  } else {
    const audio = new Audio("./assets/trumpet-e4-14829.mp3");
    audio.play();
    parentDiv.style.color = "";
    todo_ul.append(mainParent);
    li.style.textDecoration = "none";
    parentDiv.classList.remove("completed");
    dateP.style.textDecoration = "none";

    const subtasks = mainParent.querySelectorAll(".subtask-container");
    subtasks.forEach((subtask) => {
      subtask.children[0].checked = false;
      subtask.classList.remove("completed");
    });
  }
}
function checkSubtaskItem(event) {
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
    // completed_ul.append(parentDiv);
  } else {
    const audio = new Audio("./assets/trumpet-e4-14829.mp3");
    audio.play();
    parentDiv.style.color = "";
    // todo_ul.append(parentDiv);
    li.style.textDecoration = "none";
    parentDiv.classList.remove("completed");
    dateP.style.textDecoration = "none";
  }
}

function addDeleteBtn(event) {
  const i = document.createElement("i");
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

function addSubTaskBtn(event) {
  const i = document.createElement("i");
  i.sty;
  i.classList.add("bi", "bi-list-task", "subtask-btn");
  i.addEventListener("click", addSubTask);
  event.target.appendChild(i);
}

function removeSubTaskBtn(event) {
  event.target.removeChild(event.target.querySelector("i.subtask-btn"));
}

function getFormattedDay(year, month, day) {
  const formattedDate = new Date(year, month - 1, day);

  const formattedMonth = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const formattedDay = String(formattedDate.getDate()).padStart(2, "0");
  const formattedYear = formattedDate.getFullYear();

  return `${formattedMonth}-${formattedDay}-${formattedYear}`;
}

/* Modal Functionality & Subtask */

const modalContainer = document.getElementById("modal-container");
const modalForm = document.getElementById("modal-form");

window.onclick = function (event) {
  if (event.target == modalContainer) {
    modalContainer.style.display = "none";
  }
};

function openModal() {
  return new Promise((resolve, reject) => {
    modalContainer.style.display = "block";

    modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(event);
      modalContainer.style.display = "none";
      resolve(data);
    });
  });
}

async function addSubTask(event) {
  const audio = new Audio("./assets/coin-pickup-98269.mp3");
  audio.play();

  const mainDiv = event.target.parentElement.parentElement;

  const formData = await openModal();
  modalForm.reset();
  const div = createDiv(formData);

  div.removeEventListener("mouseenter", addSubTaskBtn);
  div.removeEventListener("mouseleave", removeSubTaskBtn);
  div.children[0].removeEventListener("change", checkItem);
  div.children[0].addEventListener("change", checkSubtaskItem);

  div.classList.add("subtask-container");

  mainDiv.appendChild(div);
}
