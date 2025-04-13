document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const clearButton = document.getElementById('clearButton');
    
    // Load tasks from localStorage
    loadTasks();
    
    // Add task event
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Clear all tasks event
    clearButton.addEventListener('click', clearTasks);
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        // Create new task item
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Add event listeners to the task
        li.addEventListener('click', toggleComplete);
        li.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            removeTask(li);
        });
        
        // Add to list and save
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks();
    }
    
    function toggleComplete() {
        this.classList.toggle('completed');
        saveTasks();
    }
    
    function removeTask(task) {
        task.remove();
        saveTasks();
    }
    
    function clearTasks() {
        taskList.innerHTML = '';
        saveTasks();
    }
    
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(function(task) {
            tasks.push({
                text: task.textContent,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(function(task) {
                const li = document.createElement('li');
                li.textContent = task.text;
                if (task.completed) {
                    li.classList.add('completed');
                }
                li.addEventListener('click', toggleComplete);
                li.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    removeTask(li);
                });
                taskList.appendChild(li);
            });
        }
    }
});