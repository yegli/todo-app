import express, {Router} from 'express';
const router : Router = express.Router();

import {indexController} from '../controller/index-controller.ts';

router.get("/", indexController.showIndex);
router.get("/tasks", indexController.showTasks);
router.get("/tasks/new", indexController.createTask);
router.get("/tasks/editTask", indexController.editTask);

router.post("/tasks/updateTask", indexController.updateTask);
router.post("/tasks", indexController.addTask);
export const indexRoutes : Router = router;

