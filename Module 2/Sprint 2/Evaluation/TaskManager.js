const TaskManager = (function () {
    let tasks = [];
    let taskId = 0;

    return {
        addTask: function (title) {
            let task = {
                id: ++taskId,
                title,
                completed: false
            }
            tasks.push(task)
        },
        getAllTasks: function () {
            return JSON.stringify(tasks, null, 2)
        },
        markComplete: function (id) {
            let task = tasks.find(t => t.id === id)
            if (task) task.completed = true
        },
        removeTask: function (id) {
            tasks = tasks.filter(t => t.id !== id)
        },
        getPendingTasks: function () {
            return tasks
                .filter(t => !t.completed)
                .map(t => t.title)
        },
        getCompletedtask: function () {
            return tasks
                .filter(t => t.completed)
                .map(t => t.title)
        },
        sortTasks: function () {
            return tasks
                .slice()
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(t => t.title)
        }
    }
})()


TaskManager.addTask("Buy Groceries")
TaskManager.addTask("Finish Assignment")
TaskManager.addTask("Exercise")

TaskManager.markComplete(2)

console.log("All Tasks :", TaskManager.getAllTasks())
console.log("Pending Tasks:",TaskManager.getPendingTasks())
console.log("Completed Tasks:",TaskManager.getCompletedtask())
console.log("Sorted Tasks Titles:",TaskManager.sortTasks())

TaskManager.removeTask(1)
console.log("After Removing Task 1:", TaskManager.getAllTasks())