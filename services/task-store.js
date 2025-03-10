import Datastore from 'nedb-promises'

export class Task {
    constructor(name, dueDate, importance, completed, description) {
        this.name = name;
        this.dueDate = dueDate;
        this.createDate = new Date().toISOString().split('T')[0];
        this.importance = importance;
        this.completed = completed;
        this.description = description;
        this.state = "OK";
    }
}

export class TaskStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/tasks.db', autoload: true});
    }

    async add(name, dueDate, importance, completed = false, description = "") {
        let task = new Task(name, dueDate, importance, completed, description);
        const storedTask = await this.db.insert(task);
        console.log(task._id, storedTask._id);
        return storedTask;
    }

    async update(id, name, dueDate, importance, completed, description) {
        let existingTask = await this.db.findOne({ _id: id });
        if (!existingTask) throw new Error("Task not found");

        let updateFields = {};
        if (name !== undefined) updateFields.name = name;
        if (dueDate !== undefined) updateFields.dueDate = dueDate;
        if (importance !== undefined) updateFields.importance = importance;
        if (completed !== undefined) updateFields.completed = completed;
        if (description !== undefined) updateFields.description = description;

        const updateResult = await this.db.update(
            { _id: id },
            { $set: updateFields },
            { multi: false, returnUpdatedDocs: true}
        );

        console.log("Updated Task:", updateResult);
        return updateResult;
    }

    async all(filter = {}, sortOptions = {}) {
        return this.db.find(filter).sort(sortOptions);
    }
}

export const taskStore = new TaskStore();
