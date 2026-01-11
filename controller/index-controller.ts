// Import the task store service
import { taskStore } from '../services/task-store.ts';

export class IndexController {
    showIndex(req, res) {
        res.render("index", { layout: "default", title: "Welcome!" });
    }

    async showTasks(req, res) {
        const showCompleted = req.query.showCompleted !== undefined ? 
            req.query.showCompleted === 'true' : 
            req.userSettings.showCompleted;
        const orderBy = req.query.orderBy ?? req.userSettings.orderBy;
        const orderDirection = parseInt(req.query.orderDirection as string, 10) ?? req.userSettings.orderDirection;

        let sortOptions = {};
        if (orderBy) {
            sortOptions[orderBy] = orderDirection;
        }

        const filter = showCompleted ? {} : { completed: false };
        const tasks = await taskStore.all(filter, sortOptions);

        res.render("tasks", {
            tasks,
            title: "ToDo List App",
            orderBy,
            orderDirection,
            showCompleted
        });
    }

    async editTask(req, res) {
        const { id } = req.query;
        const task = await taskStore.db.findOne({ _id: id });
        res.render("editTask", {title: "Edit your Task", task});
    }

    async updateTask(req, res) {
        const { id, Title, Importance, DueDate, Completed, Description } = req.body;
        await taskStore.update(id.trim(), Title, DueDate, parseInt(Importance, 10), Completed, Description);
        res.redirect(`/tasks?orderBy=${req.userSettings.orderBy}&orderDirection=${req.userSettings.orderDirection}&showCompleted=${req.userSettings.showCompleted}`);
    }

    createTask(req, res) {
        const { orderBy, orderDirection, showCompleted } = req.query;
        res.render("createTask", {
            title: "Create a new Task",
            orderBy,
            orderDirection,
            showCompleted
        });
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
            res.redirect(`/tasks?orderBy=${req.userSettings.orderBy}&orderDirection=${req.userSettings.orderDirection}&showCompleted=${req.userSettings.showCompleted}`);
        }
    }
}

export const indexController = new IndexController();
