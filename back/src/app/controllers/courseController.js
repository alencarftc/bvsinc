const CourseService = require('../../services/courseService');
const CourseModel = require('../models/courseModel');

module.exports = {
	async findAll(req, res) {
    	const courseService = new CourseService();

		courseService.findAll()
			.then((response) => res
				.status(200)
				.json(response))
			.catch((err) => res
				.status(500)
				.json({ error: err }));
  	},
  	async findCourseById(req, res) {
		const courseService = new CourseService();

		const { courseId } = req.params;

		courseService.findById(courseId)
			.then((response) => res
				.status(200)
				.json(response))
			.catch((err) => res
				.status(404)
				.json({ message: 'Curso não encontrado', error: err }));
	},
	async addOrUpdateCourse(req, res) {
		var { codigo: courseId, descricao } = req.body;

		if (!courseId) 
			courseId = req.params.courseId;

		const courseService = new CourseService();
		const newCourse = new CourseModel(descricao);
		
		if (req.method === 'PUT') { 
			courseService.updateCourse(courseId, newCourse)
				.then((response) => res
					.status(204)
					.json({ content: newCourse, message: 'Curso atualizado com sucesso'}))
				.catch((err) => {
					if (!err || err.length === 0) {
						return res
							.status(404)
							.json({ error: err.sqlMessage });
					}

					return res
						.status(400)
						.json({ error: err.sqlMessage });
				});
		} 
		else {
			courseService.addCourse(newCourse)
				.then((response) => res
					.status(201)
					.json({ content: { codigo: response.insertId, descricao: newCourse.descricao }, message: "Curso criado com sucesso" }))
				.catch((err) => res
					.status(400)
					.json({ error: err.sqlMessage }));
			}
	},
	async deleteCourse(req, res) {
		const { courseId } = req.params;

		const courseService = new CourseService();
		courseService.deleteCourse(courseId)
			.then(response => res
				.status(204)
				.json({message: "Curso deletado com sucesso!" }))
			.catch(err => {
				if ( !err || err.length == 0 )
					return res
						.status(404)
						.json({ error: "Curso inexistente" });

				return res
					.status(500)
					.json({ error: err });
			});
	},
};
