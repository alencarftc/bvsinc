const CourseService = require('../../services/courseService');
const DisciplineService = require('../../services/disciplineService');
const DisciplineModel = require('../../app/models/disciplineModel');

module.exports = {
    async findAll(req, res){
        const disciplineService = new DisciplineService()

        disciplineService.findAll()
            .then(response => res
                .status(200)
                .json(response))
            .catch(err => res
                .status(500)
                .json({ message: err }));
    },
    async findAllByCourseId(req, res){
        var { courseId } = req.params;

        if( !courseId )
            return res.status(403).json({ message: "Disciplina inválida" });

        const disciplineService = new DisciplineService();
        disciplineService.findAllByCourseId(courseId)
            .then(response => res
                .status(200)
                .json(response))
            .catch(err => res
                .status(500)
                .json({ err }))
    },
    async addOrUpdateDiscipline(req, res){
        const { descricao, cur_codigo } = req.body;
        const { disciplineId } = req.params;

        const disciplineService = new DisciplineService();
        const newDiscipline = new DisciplineModel(descricao, cur_codigo);

        if( req.method == "PUT" ){
            disciplineService.updateDiscipline(disciplineId, newDiscipline, cur_codigo)
                .then(response => res
                    .status(204)
                    .json({ message: "Disciplina atualizada com sucesso" }))
                .catch(err => {
                    if ( !err || err.length == 0 )
                        return res
                            .status(404)
                            .json({ message: "Disciplina inexistente" });

                    return res
                        .status(400)
                        .json({ message: err.sqlMessage });
                })
        }
        else {
            const courseService = new CourseService();

            courseService.findById(cur_codigo)
                .then(response => {
                    disciplineService.addDiscipline(newDiscipline)
                        .then(response => res
                            .status(201)
                            .json({ content: { 
                                    codigo: response.insertId, 
                                    descricao: newDiscipline.descricao, 
                                    cur_codigo: newDiscipline.cur_codigo 
                                }, message: "Disciplina criada com sucesso" })
                        )
                        .catch(err => res
                            .status(400)
                            .json({ message: err.sqlMessage}))
                })
                .catch(err => {
                    if ( !err || err.length == 0 )
                        return res
                            .status(404)
                            .json({ message: "Curso inexistente" });

                    return res
                        .status(500)
                        .json({ message: err });
                });
        }
    },
	async deleteDiscipline(req, res) {
		const { disciplineId } = req.params;

		const disciplineService = new DisciplineService();
		disciplineService.deleteDiscipline(disciplineId)
			.then(response => res
				.status(204)
				.json({message: "Disciplina deletada com sucesso!" }))
			.catch(err => {
				if ( !err || err.length == 0 )
					return res
						.status(404)
						.json({ message: "Disciplina inexistente" });

				return res
					.status(500)
					.json({ message: err });
			});
	},
}