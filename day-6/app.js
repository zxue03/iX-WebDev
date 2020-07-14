// var database = firebase.database();
console.log(firebase);
var database = firebase.database();

class Task {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

class TaskListPage {
  constructor() {
    this.tasks = [];

    const taskListElement = document.getElementById("taskList");

    database.ref("tasks/").once("value", (data) => {
      console.log(data.val());
      var value = data.val();
      if (!value) {
        return;
      }
      var existingTaskArr = Object.values(value);
      //   var value = JSON.parse(data.val());

      existingTaskArr.forEach((element) => {
        console.log(element);
        const task = new Task(element.id, element.taskTitle);
        this.tasks.push(task);
        const row = document.createElement("tr");
        row.setAttribute("data-task-id", element.id);
        row.innerHTML = `
          <td>${element.taskTitle}</td>
          <td><button data-action="edit" data-task-id="${element.id}" class="btn btn-primary">Edit</button></td>
          <td><button data-action="delete" data-task-id="${element.id}" class="btn btn-secondary">Delete</button></td>
          `;
        taskListElement.appendChild(row);
      });
    });
  }

  addTask(title) {
    const taskId = this.tasks.length + 1;
    const task = new Task(taskId, title);
    this.tasks.push(task);

    const taskListElement = document.getElementById("taskList");
    const row = document.createElement("tr");
    row.setAttribute("data-task-id", task.id);
    row.innerHTML = `
      <td>${task.title}</td>
      <td><button data-action="edit" data-task-id="${task.id}" class="btn btn-primary">Edit</button></td>
      <td><button data-action="delete" data-task-id="${task.id}" class="btn btn-secondary">Delete</button></td>
      `;
    taskListElement.appendChild(row);
    document.getElementById("task").value = "";

    database.ref("tasks/task" + taskId).set({
      id: taskId.toString(10),
      taskTitle: title,
    });
  }

  startEdittingTask(taskId) {
    for (let k = 0; k < this.tasks.length; k++) {
      if (this.tasks[k].id == taskId) {
        const task = this.tasks[k];

        const taskInputElement = document.getElementById("task");
        taskInputElement.value = task.title;
        taskInputElement.setAttribute("data-task-id", task.id);
        document.getElementById("addBtn").innerText = "Save";
      }
    }
  }

  saveTaskTitle(taskId, taskTitle) {
    // this.tasks.forEach(function (task) {
    //   if (task.id == taskId) {
    //   }
    // });

    // const task = this.tasks.find(function (task) {
    //   if (task.id == taskId) return true;
    // });

    const task = this.tasks.find((task) => task.id == taskId);
    if (!task) return;

    task.title = taskTitle;

    const existingRow = document.querySelector(`tr[data-task-id="${task.id}"]`);
    if (!existingRow) return;

    existingRow.children[0].innerHTML = task.title;
    const taskInput = document.getElementById("task");
    taskInput.removeAttribute("data-task-id");
    taskInput.value = "";
    document.getElementById("addBtn").innerText = "Add";

    database.ref("tasks/task" + taskId).set({
      id: taskId.toString(10),
      taskTitle: taskTitle,
    });
  }

  deleteTask(taskId) {
    const task = this.tasks.find((task) => task.id == taskId);
    if (!task) return;

    const existingRow = document.querySelector(`tr[data-task-id="${task.id}"]`);
    if (!existingRow) return;
    existingRow.innerHTML = "";

    // database.ref("tasks/task" + taskId).remove();

    // for (var i = taskId + 1; i <= this.tasks.length; i++) {
    //   database.ref("tasks/task" + i).update({
    //     id: taskId,
    //     taskTitle: taskTitle,
    //   });
    // }
  }
}

const taskListPage = new TaskListPage();

document.getElementById("addBtn").addEventListener("click", (e) => {
  const taskInputElement = document.getElementById("task");
  const taskTitle = taskInputElement.value;

  const existingTaskId = taskInputElement.getAttribute("data-task-id");
  if (existingTaskId) {
    taskListPage.saveTaskTitle(existingTaskId, taskTitle);
  } else {
    taskListPage.addTask(taskTitle);
  }
});

document.getElementById("taskList").addEventListener("click", (e) => {
  const action = e.target.getAttribute("data-action");
  if (action !== "edit" && action !== "delete") return;

  if (action === "edit") {
    const taskId = e.target.getAttribute("data-task-id");
    taskListPage.startEdittingTask(taskId);
  } else {
    const taskId = e.target.getAttribute("data-task-id");
    taskListPage.deleteTask(taskId);
  }
});

// function getData2(prop1, prop2) {

// }

// function getData(propertyHolder) {
//     //propertyHolder.prop1
//     //propertyHolder.prop2
// }

// function getData() {
//     this.prop1 = "a";
//     this.prop2 = "b";

//     getData2(this.prop1, this.prop2);
// }
