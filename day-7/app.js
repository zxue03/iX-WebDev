// var database = firebase.database();
console.log(firebase);
var database = firebase.database();
var priorityLevel = {};

database.ref("priority/").once("value", (data) => {
  priorityLevel = data.val();
  console.log(priorityLevel);
});

class Task {
  constructor(id, title, pl) {
    this.id = id;
    this.title = title;
    this.pl = pl;
  }
}

class TaskListPage {
  constructor() {
    this.tasks = [];

    const taskListElement = document.getElementById("taskList");

    database.ref("tasks/").once("value", (data) => {
      console.log(data.val());
      var object = data.val();
      if (!object) {
        return;
      }
      var keyArr = Object.keys(object);
      //   var value = JSON.parse(data.val());
      console.log(keyArr);
      console.log(object);

      if (keyArr.length == 0) {
        return;
      }

      keyArr.forEach((key) => {
        console.log(object[key]);
        const task = new Task(key, object[key].taskTitle, object[key].pl);
        console.log(task);
        this.tasks.push(task);
        const color = priorityLevel[task.pl].color;

        const row = document.createElement("tr");
        row.setAttribute("data-task-id", key);
        row.innerHTML = `
          <td>${task.title}</td>
          <td><button data-action="edit" data-task-id="${task.id}" class="btn btn-primary">Edit</button></td>
          <td><button data-action="delete" data-task-id="${task.id}" class="btn btn-secondary">Delete</button></td>
          <td><h3><span class="badge" style="color: ${color}">${task.pl}</span><h3></td>
          `;
        taskListElement.appendChild(row);
      });
    });
  }

  addTask(title, pl) {
    const object = database.ref("tasks/").push({
      taskTitle: title,
      pl: pl,
    });

    const taskId = object.key;
    const task = new Task(taskId, title, pl);
    this.tasks.push(task);
    const color = priorityLevel[task.pl].color;
    console.log(color);
    const taskListElement = document.getElementById("taskList");
    const row = document.createElement("tr");
    row.setAttribute("data-task-id", task.id);
    row.innerHTML = `
      <td>${task.title}</td>
      <td><button data-action="edit" data-task-id="${task.id}" class="btn btn-primary">Edit</button></td>
      <td><button data-action="delete" data-task-id="${task.id}" class="btn btn-secondary">Delete</button></td>
      <td><h3><span class="badge" style="color: ${color}">${task.pl}</span><h3></td>
      `;
    taskListElement.appendChild(row);
    document.getElementById("task").value = "";
    document.getElementById("priority").value = "";
  }

  startEdittingTask(taskId) {
    for (let k = 0; k < this.tasks.length; k++) {
      if (this.tasks[k].id == taskId) {
        const task = this.tasks[k];

        const taskInputElement = document.getElementById("task");
        taskInputElement.value = task.title;
        document.getElementById("priority").value = task.pl;
        taskInputElement.setAttribute("data-task-id", task.id);
        document.getElementById("addBtn").innerText = "Save";
      }
    }
  }

  saveTaskTitle(taskId, taskTitle, pl) {
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
    task.pl = pl;

    const color = priorityLevel[task.pl].color;

    const existingRow = document.querySelector(`tr[data-task-id="${task.id}"]`);
    if (!existingRow) return;

    existingRow.children[0].innerHTML = task.title;
    existingRow.children[3].innerHTML = `<td><h3><span class="badge" style="color: ${color}">${task.pl}</span><h3></td>`;
    const taskInput = document.getElementById("task");
    const priorityInput = document.getElementById("priority");
    taskInput.removeAttribute("data-task-id");
    taskInput.value = "";
    priorityInput.value = "";
    document.getElementById("addBtn").innerText = "Add";

    database.ref("tasks/" + taskId).set({
      taskTitle: taskTitle,
      pl: pl,
    });
  }

  deleteTask(taskId) {
    const task = this.tasks.find((task) => task.id == taskId);
    if (!task) return;

    const existingRow = document.querySelector(`tr[data-task-id="${task.id}"]`);
    if (!existingRow) return;
    existingRow.innerHTML = "";

    database.ref("tasks/" + taskId).remove();
  }
}

const taskListPage = new TaskListPage();

document.getElementById("addBtn").addEventListener("click", (e) => {
  const taskInputElement = document.getElementById("task");
  const priorityElement = document.getElementById("priority");
  const taskTitle = taskInputElement.value;
  const pl = priorityElement.value;

  const existingTaskId = taskInputElement.getAttribute("data-task-id");
  if (existingTaskId) {
    taskListPage.saveTaskTitle(existingTaskId, taskTitle, pl);
  } else {
    taskListPage.addTask(taskTitle, pl);
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
