const API_URL = "http://localhost:5000/tasks";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Fetch and display tasks
async function fetchTasks() 
{
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        displayTasks(tasks);} 
        catch (error) 
        {
        console.error("Error fetching tasks:", error);}
}

// Display tasks on the page
function displayTasks(tasks) 
{
    taskList.innerHTML = "";
    tasks.forEach(task => {const li = document.createElement("li");
        li.className = "task-item";
        li.innerHTML = `
            <span>${task.title}</span>
            <button
                class="delete-btn"
                onclick="deleteTask('${task._id}')">
                Delete
            </button>`;
            taskList.appendChild(li);});
}
// Add new task
taskForm.addEventListener("submit", async (event) => {event.preventDefault();
    const title = taskInput.value.trim();
    if (!title) 
        {
        return;}
    try
    {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title
            })
        });
        if (!response.ok) {
            throw new Error("Failed to add task");
        }
        taskInput.value = "";
        fetchTasks();
    } catch (error) {
        console.error("Error adding task:", error);
    }
});
// Delete task
async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to delete task");
        }
        fetchTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}
fetchTasks();
