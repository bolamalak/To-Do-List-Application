const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll(".filter");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";


renderTasks();
addButton.addEventListener("click", addTask);




function addTask() {

    const text = taskInput.value.trim();
    if (text === "") {
    return;
}
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    saveTasks();

    taskInput.value = "";
    renderTasks();
}






function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}






function renderTasks() {

    taskList.innerHTML = "";


    let filteredTasks = tasks;


    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function(task) {
            return task.completed === false;
        });
    }


    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(function(task) {
            return task.completed === true;
        });
    }




    if (filteredTasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }



    filteredTasks.forEach(function(task) {

        const li = document.createElement("li");

        li.classList.add("task");



        if (task.completed===true) {
            li.classList.add("completed");
        }


        const leftSide = document.createElement("div");

        leftSide.classList.add("task-left");




        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;




        checkbox.addEventListener("change", function() {

            toggleTask(task.id);

        });




        const span = document.createElement("span");

        span.classList.add("task-text");
        span.textContent = task.text;




        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });




        leftSide.appendChild(checkbox);
        leftSide.appendChild(span);


        li.appendChild(leftSide);
        li.appendChild(deleteButton);



        taskList.appendChild(li);

    });

}





function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    saveTasks();
    renderTasks();

}



function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });


    renderTasks();

}




filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });



        button.classList.add("active");

        currentFilter = button.dataset.filter;

        saveTasks();
        renderTasks();

    });

});