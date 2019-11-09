const db = require('../config/mysql');
const ToolModel = require('../app/models/toolModel')

module.exports = class ToolService {
    async findPage(start, limit){
        return new Promise((resolve, reject) => {
            db.query("SELECT count(*) as TotalCount FROM ferramenta", (err, res) => {
                if(err) reject(err);
                
                const totalCount = res[0].TotalCount;

                var query = "SELECT * FROM ferramenta ORDER BY codigo DESC LIMIT ? OFFSET ?"; 
                const params = [parseInt(limit), parseInt(start)];
    
                query = db.format(query, params);
                db.query(query, (err, data) => {
                    if(err) reject(err);
                    
                    resolve({totalCount, data});
                });
            });
        });
    }
    async findPageByDisciplineId(disciplineId, start, limit){
        return new Promise((resolve, reject) => {
            db.query("SELECT count(*) as TotalCount FROM ferramenta", (err, res) => {
                if(err) reject(err);
                
                const totalCount = res[0].TotalCount;

                var query = "SELECT * FROM ferramenta WHERE disc_codigo = ? ORDER BY codigo DESC LIMIT ? OFFSET ?"; 
                const params = [disciplineId, limit, start];
    
                query = db.format(query, params);
                db.query(query, (err, data) => {
                    if(err) reject(err);
                    
                    resolve({totalCount, data});
                });
            });
        });
    }
    async findById(toolId){
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM ferramenta WHERE codigo = ?", toolId, (err, res) => {
                if(err) 
                    reject(err);
                else if(res.length > 0)
                    resolve(res);

                reject(res);
            })
        });
    }
    async addTool(tool){
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO ferramenta set ?", tool, (err, res) => {
                if(err) reject(err);

                resolve(res);
            })
        });
    }
    async updateTool(toolId, newTool, disc_codigo){
        return new Promise((resolve, reject) => {
            this.findById(toolId)
                .then(oldTool => {
                    const finalTool = new ToolModel(
                        !newTool.titulo ? oldTool[0].titulo : newTool.titulo,
                        !newTool.descFerramenta ? oldTool[0].descFerramenta : newTool.descFerramenta,
                        !newTool.siteFerramenta ? oldTool[0].siteFerramenta : newTool.siteFerramenta,
                        !newTool.clasFerramenta ? oldTool[0].clasFerramenta : newTool.clasFerramenta,
                        !newTool.tipoFerramenta ? oldTool[0].tipoFerramenta : newTool.tipoFerramenta,
                        !newTool.objFerramenta ? oldTool[0].objFerramenta : newTool.objFerramenta,
                        !newTool.patFerramenta ? oldTool[0].patFerramenta : newTool.patFerramenta,
                        disc_codigo
                    );

                    var query = `UPDATE ferramenta SET titulo = ?,
                                                       objFerramenta = ?,
                                                       descFerramenta = ?,
                                                       siteFerramenta = ?,
                                                       clasFerramenta = ?,
                                                       tipoFerramenta = ?,
                                                       patFerramenta = ?,
                                                       disc_codigo = ? WHERE codigo = ?`; 
                                                       
                    const params = [finalTool.titulo, finalTool.objFerramenta,
                        finalTool.descFerramenta, finalTool.siteFerramenta,
                        finalTool.clasFerramenta, finalTool.tipoFerramenta,
                        finalTool.patFerramenta, finalTool.disc_codigo, toolId
                    ];

                    query = db.format(query, params);
                    db.query(query, (err, res) => {
                        if(err) reject(err);

                        resolve(res);
                    })
                })
                .catch(err => reject(err));
        });
    }
    async deleteTool(toolId){
        return new Promise((resolve, reject) => {
            this.findById(toolId)
                .then(response => {
                    db.query('DELETE FROM ferramenta WHERE codigo = ?', toolId, (err, res) => {
                    if (err) reject(err);
            
                    resolve(res);
                    });
                })
                .catch(err => reject(err))
        });
    }
}