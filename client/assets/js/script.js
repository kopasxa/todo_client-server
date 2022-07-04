"use strict";

const form = document.querySelector("#formForCreateTask");
const btn_create_task = document.querySelector("#create_task");
const task_name = form.querySelector("input[name='task_name']");
const task_description = form.querySelector("textarea[name='task_description']");
const error_form = form.querySelector(".errors");

const list_tasks = document.querySelector("#list");
var tasks = list_tasks.querySelectorAll(".item");

window.onload = function () {
    getTasks();

    btn_create_task.addEventListener("click", function (e) {
        e.preventDefault();
        if (task_name.value != "" & task_description.value != "") {
            error_form.innerHTML = "";
            createTask();
            printTask(task_name.value, task_description.value, false);
        }
        else {
            error_form.innerHTML = "Please fill in all fields";
        }
    });
}

function printTask(task_name, task_description, isCheck, id) {
    list_tasks.innerHTML += `
        <li class="item" data-id='${id}'>
            <form action="POST">
                <div class="content">
                    <input type="text" name="edit_task_name" readonly value="${task_name}" class="task_name"/>
                    <input type="text" name="edit_task_desc" readonly value="${task_description}" class="task_description"/>
                    <input type="hidden" name="id" value="${id}">
                </div>
                <div class="buttons">
                    <button class="editTask" data-status="edit">Edit</button>
                    <button class="deleteTask">Delete</button>
                    <input type="checkbox" name="task_check" ${Boolean(isCheck) === false ? '' : 'checked'} class="task_check">
                </div>
            </form>
        </li>
    `;
    researchButtons();
    tasks = list_tasks.querySelectorAll(".item");
}

function researchButtons () {
    var btn_edit_task = list_tasks.querySelectorAll(".editTask");
    var btn_delete_task = list_tasks.querySelectorAll(".deleteTask");
    var is_check_task = list_tasks.querySelectorAll(".task_check");

    btn_edit_task.forEach(function (element) {
        element.addEventListener("click", function (e) {
            e.preventDefault();
            if (e.target.dataset.status == "edit") {
                e.target.dataset.status = "save";
                e.target.innerHTML = "save";
    
                e.path[3].classList.toggle("edit");
                e.path[3].querySelectorAll(".content input").forEach(function (el) {
                    el.readOnly = false;
                })
            }
            else if (e.target.dataset.status == "save") {
                editTask(e.path[3].dataset.id);

                e.target.dataset.status = "edit";
                e.target.innerHTML = "edit";

                e.path[3].classList.toggle("edit");
                e.path[3].querySelectorAll(".content input").forEach(function (el) {
                    el.readOnly = true;
                })
            }
        });
    });

    btn_delete_task.forEach(function (element) {
        element.addEventListener("click", function (e) {
            e.preventDefault();
            delTask(e.path[3].dataset.id);
        })
    });

    is_check_task.forEach(function (element) {
        element.addEventListener("change", function (e) {
            isCompletedTask(e.path[3].dataset.id)
        })
    })
}

function createTask() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == 200) {
            console.log("Create task OK");            
        }
        else if (this.status == 400) {
            alert("Create task error")
        }
    };

    request.open("POST", "../server/create_task.php", true);
    request.send(new FormData(form));
}

function editTask(id) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == 200) {
            console.log("Edit task OK");            
        }
        else if (this.status == 400) {
            alert("Edit task error")
        }
    };

    request.open("POST", "../server/edit_task.php", true);
    let form = document.querySelector(`li[data-id="${id}"] form`)
    request.send(new FormData(form));
}

function getTasks() {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == 200) {
            list_tasks.innerHTML = '';
            JSON.parse(request.responseText).forEach(function (e) {
                printTask(e.task_name, e.task_desc, e.isCompleted == '0' ? false : true, e.id)
            });
            console.log("Get tasks OK");
        }
        else if (this.status == 400) {
            alert("Get tasks error")
        }
    };

    request.open("GET", "../server/get_tasks.php", true);
    request.send();
}

function delTask(id) {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == 200) {
            document.querySelector(`#list li[data-id='${id}']`).remove();
        }
        else if (this.status == 400) {
            alert("Delete task error")
        }
    };

    request.open("POST", "../server/delete_task.php", true);
    let form = document.querySelector(`li[data-id="${id}"] form`)
    request.send(new FormData(form));
}

function isCompletedTask(id) {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == 200) {
            console.log("Change task status OK")
        }
        else if (this.status == 400) {
            alert("Change task status error")
        }
    };

    request.open("POST", "../server/change_status.php", true);
    let form = document.querySelector(`li[data-id="${id}"] form`)
    request.send(new FormData(form));
}