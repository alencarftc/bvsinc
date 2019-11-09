const ToolService = require('../../services/toolService');
const ToolModel = require('../models/toolModel')
const DisciplineService = require('../../services/disciplineService');

module.exports = {
    async findAll(req, res){
        const toolService = new ToolService()
        var { start, limit } = req.query;

        console.log(req)
        if( !start || !limit ){
            start = 0;
            limit = 10;
        }

        toolService.findPage(start, limit)
            .then(response => res
                .status(200)
                .json(response))
            .catch(err => res
                .status(500)
                .json({ err }))
    },
    async findPageByDisciplineId(req, res){
        const { disciplineId } = req.params;
        var { start, limit } = req.body;

        if( !start || !limit ){
            start = 0;
            limit = 10;
        }

        if( !disciplineId ) 
            return res.status(403).json({ message: "Disciplina inválida" });

        const toolService = new ToolService();
        const disciplineService = new DisciplineService();

        disciplineService.findById(disciplineId)
            .then(response => {
                toolService.findPageByDisciplineId(disciplineId, start, limit)
                    .then(response => res
                        .status(200)
                        .json(response));
            }) 
            .catch(err => res
                .status(404)
                .json({ message: "Disciplina inexistente" }));
    },
    async findByToolId(req, res){
        const { toolId } = req.params;

        const toolService = new ToolService();
        
        toolService.findById(toolId)
            .then(tool => res
                .status(200)
                .json(tool))
            .catch(err => res
                .status(404)
                .json({ message: "Ferramenta não encontrada" }))
    },
    async addOrUpdateTool(req, res){
        const { titulo, objFerramenta, 
                descFerramenta, siteFerramenta,
                clasFerramenta, tipoFerramenta,
                patFerramenta, disc_codigo } = req.body;
        const { toolId } = req.params;
                
        const toolService = new ToolService();

        const newTool = new ToolModel(
            titulo, descFerramenta, 
            siteFerramenta, clasFerramenta, 
            tipoFerramenta, objFerramenta, 
            patFerramenta, disc_codigo
        );            

        if( req.method == 'PUT' && toolId ){
            toolService.updateTool(toolId, newTool, disc_codigo)
                .then(response => res
                    .status(204)
                    .json(response))
                .catch(err => {
                    if ( !err || err.length == 0 ) 
                        return res
                            .status(404)
                            .json({ message: "Ferramenta inexistente" });

                    return res
                        .status(400)
                        .json({ message: err.sqlMessage })
                })
        }
        else {
            const disciplineService = new DisciplineService();
            disciplineService.findById(disc_codigo)
                .then(response => {
                    toolService.addTool(newTool)
                        .then(response => res
                            .status(201)
                            .json(response))
                        .catch(err => res
                            .status(400)
                            .json({ message: err.sqlMessage }))    
                })
                .catch(err => {
                    if ( !err || err.length == 0 )
                        return res
                            .status(404)
                            .json({ message: "Disciplina inexistente" });
        
                    return res
                        .status(500)
                        .json({ message: err });
                });
        }
    },
    async deleteTool(req, res){
		const { toolId } = req.params;

		const toolService = new ToolService();
		toolService.deleteTool(toolId)
			.then(response => res
				.status(204)
                .json({message: "Ferramenta deletada com sucesso!" }))
			.catch(err => {
				if ( !err || err.length == 0 )
					return res
						.status(404)
						.json({ message: "Ferramenta inexistente" });

				return res
					.status(500)
					.json({ message: err });
			});
    }
}