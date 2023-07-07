let addBtn = document.getElementById("add-btn")
let taskList = document.getElementById("tasksLists")
let taskId = 100
let inputTask = null

function saveRecentTask() {
    inputTask = document.getElementById("task-input").value
    console.log(inputTask)

    if (inputTask != '') {
        taskId = 101
        let taskKeyArr = []
        for (let i = 0; i < localStorage.length; i++) {
            taskKeyArr[i] = localStorage.key(i)
        }
        for (let i = 0; i < localStorage.length; i++) {
            if (taskKeyArr.includes(`task${taskId}`)) {
                taskId++
            }
        }
        localStorage.setItem(`task${taskId}`, inputTask)
        document.getElementById("task-input").value = ''
        return true
    }
    else
        return false
}

function addNewTask() {

    if (saveRecentTask()) {
        showTask(taskId)
    }
}

function showTask(taskId) {
    let taskBody = document.createElement("div")

    document.getElementById("no-task-msg").innerHTML = ""
    document.getElementById("delete-all").disabled = false
    taskBody.setAttribute("id", `task${taskId}`)
    taskBody.classList.add("card", "mx-4", "my-2")
    taskBody.style.width = "16rem"

    let taskContent = document.createElement("div")
    taskContent.classList.add("card-body")
    taskContent.innerHTML = `<p class="card-text">${localStorage.getItem(`task${taskId}`)}</p>
        <button id="e-btn${taskId}" type="button" class="btn btn-primary btn-sm"
        onclick="editTask(this.id)" data-toggle="modal" data-target="#exampleModal">
        Edit</button>
        <button id='btn${taskId}' type="button" class="btn btn-danger btn-sm" 
        onclick="deleteTask(this.id)">Delete</button>`

    taskBody.append(taskContent)
    taskList.append(taskBody)
}

function fetchAllTask() {
    if (localStorage.length == 0) {
        document.getElementById("no-task-msg").innerHTML = "<h3> No Task to show !!</h4>"
    } else {
        for (let i = 0; i < localStorage.length; i++) {
            document.getElementById("delete-all").disabled = false
            let taskKey = Number.parseInt((localStorage.key(i)).substring(4))
            showTask(taskKey)
        }
    }
}
window.onload = fetchAllTask()

function deleteTask(btn) {
    let btnId = document.getElementById(btn)
    let taskHaveToDelete = btnId.parentElement.parentElement.id
    let taskIdNeedToDelete = document.getElementById(taskHaveToDelete)
    taskIdNeedToDelete.remove()
    localStorage.removeItem(taskHaveToDelete)
    if (localStorage.length == 0) {
        document.getElementById("no-task-msg").innerHTML = "<h3> No Task to show !!</h4>"
        document.getElementById("delete-all").disabled = true
    }
}


function deleteAllTask() {
    while (taskList.childNodes.length > 2) {
        taskList.removeChild(taskList.lastChild)
    }
    localStorage.clear()
    taskId = 100
    document.getElementById("no-task-msg").innerHTML = "<h3> No Task to show !!</h4>"
    document.getElementById("delete-all").disabled = true
}

function editTask(btn) {
    let btnId = document.getElementById(btn)
    console.log(btn)
    let taskHaveToEdit = btnId.previousElementSibling
    console.log(taskHaveToEdit.textContent)
    document.getElementById("exampleModal").firstElementChild.firstElementChild
    .firstElementChild.firstElementChild.setAttribute("id",`sc${btn}`)
    document.getElementById(`sc${btn}`).innerHTML = taskHaveToEdit.textContent
}

function saveChanges() {
    let modalBoxId = document.getElementById("exampleModal").firstElementChild
    .firstElementChild.firstElementChild.firstElementChild.id
    let updateText = document.getElementById(modalBoxId).value
    let changeTaskId = (modalBoxId).substring(2)
    let key = "task"+changeTaskId.substring(5)
    console.log(changeTaskId)
    document.getElementById(changeTaskId).previousElementSibling.innerHTML= updateText
    localStorage.setItem(key,updateText)
    // document.getElementById("exampleModel").modal('hide')
}