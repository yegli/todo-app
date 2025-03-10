// Import the task store service
import { taskStore } from '../services/task-store.js';

export class IndexController {
    showIndex(req, res) {
        res.render("index", { layout: "default", title: "Welcome!" });
    }

    async showTasks(req, res) {
        let { completed, orderBy, orderDirection } = req.query;
        let sortOptions = {};
        if (orderBy) {
            sortOptions[orderBy] = orderDirection === 'desc' ? -1 : 1;
        }
        const filter = completed !== undefined ? {} : { completed: false };
        const tasks = await taskStore.all(filter, sortOptions);
        res.render("tasks", { tasks, title: "ToDo List App", orderBy, orderDirection, completed });
    }

    async editTask(req, res) {
        const { id } = req.query;
        const task = await taskStore.db.findOne({ _id: id });
        res.render("editTask", {title: "Edit your Task", task});
    }

    async updateTask(req, res) {
        const { id, Title, Importance, DueDate, Completed, Description } = req.body;
        await taskStore.update(id.trim(), Title, DueDate, parseInt(Importance, 10), Completed === "on", Description);
        res.redirect("/tasks");
    }

    createTask(req, res) {
        res.render("createTask", {title: "Create a new Task"});
    }

    async addTask(req, res) {
        try {
            const { Title, Importance, DueDate, Completed, Description } = req.body;
            const taskData = {
                name: Title,
                importance: parseInt(Importance, 10) || 1,
                dueDate: DueDate,
                completed: Completed === "on",
                description: Description || "",
            };
            await taskStore.add(taskData.name, taskData.dueDate, taskData.importance, taskData.completed, taskData.description);
        } finally {
            res.redirect("/tasks");
        }
    }
}

export const indexController = new IndexController();
