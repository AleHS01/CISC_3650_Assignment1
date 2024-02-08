const form = document.getElementById("form");
const todo_ul = document.getElementById("todo-ul");
const completed_ul = document.getElementById("completed-ul");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = event.target[0].value;
  const date = event.target[1].value;

  const div = document.createElement("div");
  div.classList.add("li-container");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", checkItem);

  const li = document.createElement("li");

  div.addEventListener("mouseenter", addDeleteBtn);

  div.addEventListener("mouseleave", removeDeleteBtn);
  li.innerText = task;

  div.appendChild(checkbox);
  div.appendChild(li);

  todo_ul.appendChild(div);

  console.log(event);
});

function checkItem(event) {
  const parentDiv = event.target.parentElement;
  const li = parentDiv.children[1];

  if (event.target.checked) {
    li.style.textDecoration = "line-through";
    completed_ul.append(parentDiv);
  } else {
    todo_ul.append(parentDiv);
    li.style.textDecoration = "none";
  }
}

function addDeleteBtn(event) {
  const span = document.createElement("span");
  span.style.cursor = "pointer";
  span.classList.add("text-danger");
  span.textContent = "x";

  span.addEventListener("click", deleteTask);

  event.target.appendChild(span);
}

function removeDeleteBtn(event) {
  event.target.removeChild(event.target.querySelector("span"));
}

function deleteTask(event) {
  const task = event.target.parentElement;
  task.remove();
}
