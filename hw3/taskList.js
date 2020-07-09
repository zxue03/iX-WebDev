class UI {
  addTask(taskInput) {
    const list = document.getElementById("task-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${taskInput}</td>
        <td><a class="edit" style="cursor: pointer;" >&#9997</a></td>
      `;

    list.appendChild(row);
  }

  clearFields() {
    document.getElementById("task-input").value = "";
  }

  editTask(target){
    if (target.className === "edit") {

       document.getElementById("task-input").value = target.parentElement.parentElement.children[0].innerHTML;
        target.parentElement.parentElement.remove();
      }
  }
}

document.getElementById("task-form").addEventListener("submit", function (e) {
  const taskInput = document.getElementById("task-input").value;


  const interface = new UI();
  interface.addTask(taskInput);
  interface.clearFields();

  e.preventDefault();
});


document.getElementById("task-list").addEventListener("click", function (e) {
  const interface = new UI();
  interface.editTask(e.target);
  e.preventDefault();
});
