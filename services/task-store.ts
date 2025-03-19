import Datastore from 'nedb-promises'

export class Task {
    name: string;
    dueDate: string;
    createDate: string;
    importance: number;
    completed: boolean;
    description: string;
    state: string;
    _id: number;

    constructor(name : string, dueDate : string, importance : number, completed : boolean, description :string) {
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
    db: Datastore<Task>;

    constructor(db? : Datastore<Task>) {
        this.db = db || Datastore.create({ filename: './data/tasks.db', autoload: true });
    }

    async add(name : string, dueDate : string, importance : number, completed = false, description = "") : Promise<Task> {
        let task: Task = new Task(name, dueDate, importance, completed, description);
        const storedTask : Task = await this.db.insert(task);
        console.log(task._id, storedTask._id);
        return storedTask;
    }

    async update(id: string, name: string, dueDate: string, importance: number, completed: string, description : string) : Promise<Task> {
        let existingTask : Task = await this.db.findOne({ _id: id });
        if (!existingTask) throw new Error("Task not found");

        let updateFields: Record<string, any> = {};
        if (name !== undefined) updateFields.name = name;
        if (dueDate !== undefined) updateFields.dueDate = dueDate;
        if (importance !== undefined) updateFields.importance = importance;
        if (completed !== undefined) updateFields.completed = completed;
        if (description !== undefined) updateFields.description = description;

        const updateResult : Task = await this.db.update(
            { _id: id },
            { $set: updateFields },
            { multi: false, returnUpdatedDocs: true}
        );

        console.log("Updated Task:", updateResult);
        return updateResult;
    }

    async all(filter = {}, sortOptions = {}) : Promise<Task[]> {
        return this.db.find(filter).sort(sortOptions);
    }
}

export const taskStore = new TaskStore();
