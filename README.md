# To-Do App (Vanilla JS)

A simple yet powerful to-do app built with Vanilla JavaScript. This app helps you manage tasks effectively with features like priorities, deadlines, subtasks, and audio feedback for actions.

## Features

- **Add a Task**: Easily create new tasks to stay organized.  
- **Set Deadlines**: Assign due dates to your tasks.  
- **Set Priority Levels**: Categorize tasks by priority—Low, Medium, or High.  
- **Delete a Task**: Remove tasks when they're no longer needed.  
- **Add Subtasks**: Use a popup modal to add subtasks for better task management / task breakdown.  
- **Audio Feedback**: Sound effects for task actions like adding, completing, uncompleting, or deleting.  

## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Prerequisites

- A code editor is required. **VS Code** is recommended for its ease of use.  
  - Install the **Live Server** extension for a smoother development experience.  

---
## Setup
- Clone the repository:

```bash
git clone https://github.com/AleHS01/rails_learning_project.git
cd ToDo_VanillaJS
```
---
## Running the App

- If you're using **VS Code** with the **Live Server Extension**, click the **Go Live** button at the bottom of the editor.  
- Visit the app in your browser at:  
```bash
http://localhost:5500
```
---

## Core Functionality
<details>
<summary>Task Completion</summary>
  
```javascript
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
    completed_ul.append(mainParent); // Moving between List

    const subtasks = mainParent.querySelectorAll(".subtask-container"); // Moving subtask
    subtasks.forEach((subtask) => {
      subtask.children[0].checked = true;
      subtask.classList.add("completed");
    });
  } else {
    const audio = new Audio("./assets/trumpet-e4-14829.mp3");
    audio.play();
    parentDiv.style.color = "";
    todo_ul.append(mainParent); // Moving between List
    li.style.textDecoration = "none";
    parentDiv.classList.remove("completed");
    dateP.style.textDecoration = "none";

    const subtasks = mainParent.querySelectorAll(".subtask-container"); // Moving subtask
    subtasks.forEach((subtask) => {
      subtask.children[0].checked = false;
      subtask.classList.remove("completed");
    });
  }
}
```
</details>
<details>
<summary>Task Deletion</summary>
  
```javascript
function deleteTask(event) {
  const audio = new Audio("./assets/crumple-03-40747.mp3");
  audio.play();
  const task = event.target.parentElement;
  if (!task.classList.contains("subtask-container")) {
    const div = task.parentElement;
    div.remove();
  } else {
    task.remove();
  }
}
```
</details>
<details>
<summary>Adding Subtask</summary>
  
```javascript
function addSubTaskBtn(event) {
  const i = document.createElement("i");
  i.sty;
  i.classList.add("bi", "bi-list-task", "subtask-btn");
  i.addEventListener("click", addSubTask);
  event.target.appendChild(i);
}
```
</details>
<details>
<summary>Removing Subtask</summary>
  
```javascript
function removeSubTaskBtn(event) {
  event.target.removeChild(event.target.querySelector("i.subtask-btn"));
}
```
</details>
<details>
<summary>Modal Functionality</summary>
  
```javascript
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
```
</details>

## Deployment

This project is deployed using GitHub Pages.  
[**Live Demo**](https://alehs01.github.io/ToDo_VanillaJS/)

You can deploy your own instance by following these steps:  
1. Go to the **Settings** of your repository.  
2. Click on **Pages** in the sidebar.  
3. Under the **Branch** section, select "Main" and click **Save**.  
4. Wait 3-5 minutes for the deployment to complete.  
5. The deployed app's link will appear in the **Deployments** section on the right sidebar.
6. Ensure the main page of your project is named **index.html** so GitHub can locate it correctly.  
