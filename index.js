const form = document.getElementById("form");
const todo_ul = document.getElementById("todo-ul");
const completed_ul = document.getElementById("completed-ul");
const dropdown = document.getElementById("priority");
dropdown.clas;
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

  const div = document.createElement("div");
  div.classList.add(`li-container`, priority ? priority : "neutral");
  div.addEventListener("mouseenter", addDeleteBtn);

  div.addEventListener("mouseleave", removeDeleteBtn);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", checkItem);

  const li = document.createElement("li");
  li.textContent = task;

  div.appendChild(checkbox);
  div.appendChild(li);

  if (formattedDateString) {
    console.log(formattedDateString);
    const dateP = document.createElement("p");
    dateP.classList.add("date");
    dateP.textContent = `Due Date: ${formattedDateString}`;
    dateP.style.margin = 0;
    div.appendChild(dateP);
  }

  todo_ul.appendChild(div);

  console.log(event);
});

function checkItem(event) {
  const parentDiv = event.target.parentElement;
  const li = parentDiv.children[1];
  const dateP = parentDiv.children[2];

  if (event.target.checked) {
    li.style.textDecoration = "line-through";
    dateP.style.textDecoration = "line-through";
    parentDiv.style.color = "#c8c8c8";
    parentDiv.classList.add("completed");
    completed_ul.append(parentDiv);
  } else {
    parentDiv.style.color = "";
    todo_ul.append(parentDiv);
    li.style.textDecoration = "none";
    parentDiv.classList.remove("completed");
    dateP.style.textDecoration = "none";
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
