var startingMinutes = 25;
let time = startingMinutes * 60;
const breakMinutes = 5;
let breakTime = breakMinutes * 60;
var Timer = document.getElementById("time");
var buttonBreak = document.getElementById("break");
var buttonStart = document.getElementById("start");
buttonStart.style.display = "block";
buttonBreak.style.display = "none";

function start(){
    t = setInterval(timer, 1000);
    buttonStart.style.display = "none";
}

//fix timer bug. Can't stop.
//FIXED!!! 20.06.25

function timer(){
    console.log("Hello")
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds: seconds;
    Timer.innerHTML = `${minutes}:${seconds}`;
    time--;
    if (time < 0)
    {
        clearInterval(t);
        buttonBreak.style.display = "block";
    }
}

function five(){
    const minutes = Math.floor(breakTime / 60);
    let seconds = breakTime % 60;
    seconds = seconds < 10 ? '0' + seconds: seconds;
    Timer.innerHTML = `${minutes}:${seconds}`;
    breakTime--;
    if (breakTime < 0)
        {
            clearInterval(Br);
            Timer.style.fontSize = 70;
            Timer.innerHTML = "Let's Go! Study time";
            buttonStart.style.display = "block";
        }
}

function Break(){
    Br = setInterval(five, 1000);
    buttonBreak.style.display = "none";
}

//

document.addEventListener("DOMContentLoaded", () => {

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const emptyImage = document.querySelector(".empty-image");
const todosContainer = document.querySelector(".todos-container");
const progressBar = document.getElementById("progress");
const progressNumbers = document.getElementById("numbers");

//taskInput.style.color = taskInput;

const toggleEmptyState = () => {
    emptyImage.style.display = taskList.children.
    length === 0 ? "block" : "none";
    todosContainer.style.width = taskList.children.
    length > 0 ? "50%" : "0%";
};

const updateProgress = (checkCompletion = true) => {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll(".checkbox:checked").length;

    progressBar.style.width = totalTasks ? 
    `${(completedTasks / totalTasks) * 100}%` : "0%";
    progressNumbers.textContent = 
    `${completedTasks} / ${totalTasks}`;

    if (checkCompletion && totalTasks > 0 && completedTasks === totalTasks)
    {
        Confetti();
    }
};

const saveTaskToStorage = () => {
    const tasks = Array.from(taskList.querySelectorAll("li")).map(list => ({
        text: list.querySelector("span").textContent, 
        completed: list.querySelector(".checkbox").checked
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasksFromStorage = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(({ text, completed }) => addTask(text, completed, false));
    toggleEmptyState();
    updateProgress();
};

const addTask = (text, completed = false, checkCompletion = true) => {
    //text.preventDefault();
    const taskText = text || taskInput.value.trim();
    if(!taskText)
    {
        return;
    };

    const list = document.createElement("li");
    list.innerHTML = `
    <input type="checkbox" class="checkbox" $
    {completed ? "checked" : ""}/>
    <span>${taskText}</span> 
    <div class="task-buttons">
        <button class="edit-btn"><i 
        class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i 
        class="fa-solid fa-trash"></i></button>
    </div>
    `;

    const checkbox = list.querySelector(".checkbox");
    const editBtn = list.querySelector(".edit-btn");

    if(completed)
    {
        list.classList.add("completed");
        editBtn.disabled = true;
        editBtn.style.opacity = "0.5";
        editBtn.style.pointerEvents = "none";
    };

    
    checkbox.addEventListener("change", () => {
        const isChecked = checkbox.checked;
        list.classList.toggle("completed", isChecked);
        editBtn.disabled = isChecked;
        editBtn.style.opacity = isChecked ? "0.5" : "1";
        editBtn.style.pointerEvents = isChecked ? "none" : "auto";
        updateProgress();
        saveTaskToStorage();
    });

    //FIX THISS THEN UR DONEEE

    editBtn.addEventListener("click", () => {
        if(!checkbox.checked)
        {
            taskInput.value = list.querySelector("span").textContent;
            list.remove();
            toggleEmptyState();
            updateProgress(false);
            saveTaskToStorage();
        };
    });

    list.querySelector(".delete-btn").addEventListener("click", () => {
        list.remove();
        toggleEmptyState();
        updateProgress();
        saveTaskToStorage();
    });

    taskList.appendChild(list);
    taskInput.value = "";
    toggleEmptyState()
    updateProgress(checkCompletion);
    saveTaskToStorage();
};

addTaskBtn.addEventListener("click", (i) => {
    i.preventDefault();
    addTask();
});
//try and fix this line. DONE!!
taskInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter")
    {
        e.preventDefault();
        addTask();
    }
});
    loadTasksFromStorage();
});

const Confetti = () => {
    const defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["star"],
  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ["star"],
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 0.75,
    shapes: ["circle"],
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
}