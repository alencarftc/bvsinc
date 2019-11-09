const express = require('express');
const UserController = require('./app/controllers/userController')
const SessionController = require('./app/controllers/sessionController')

const CourseController = require('./app/controllers/courseController')
const DisciplineController = require('./app/controllers/disciplineController')
const ToolController = require('./app/controllers/toolController')

const sessionMiddleware = require('./middlewares/sessionMiddleware')

const routes = express.Router();

routes.post("/users/authenticate", SessionController.store);
routes.post("/users", UserController.store, sessionMiddleware.checkToken);

routes.get("/courses/:courseId/disciplines", DisciplineController.findPageByCourseId);
routes.get("/courses/:courseId", CourseController.findCourseById);
routes.get("/courses", CourseController.findAll);
routes.post("/courses", CourseController.addOrUpdateCourse);
routes.put("/courses/:courseId", sessionMiddleware.checkToken, CourseController.addOrUpdateCourse);
routes.delete("/courses/:courseId", CourseController.deleteCourse);

routes.get("/disciplines/:disciplineId/tools", ToolController.findPageByDisciplineId);
routes.get("/disciplines", DisciplineController.findAll);
routes.post("/disciplines", sessionMiddleware.checkToken, DisciplineController.addOrUpdateDiscipline);
routes.put("/disciplines/:disciplineId", sessionMiddleware.checkToken, DisciplineController.addOrUpdateDiscipline)
routes.delete("/disciplines/:disciplineId", DisciplineController.deleteDiscipline);

routes.get("/tools/:toolId", ToolController.findByToolId);
routes.get("/tools", ToolController.findAll);
routes.post("/tools", sessionMiddleware.checkToken, ToolController.addOrUpdateTool);
routes.put("/tools/:toolId", sessionMiddleware.checkToken, ToolController.addOrUpdateTool);
routes.delete("/tools/:toolId", ToolController.deleteTool);

module.exports = routes;