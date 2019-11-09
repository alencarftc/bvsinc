const db = require('../config/mysql');
const DisciplineModel = require('../app/models/disciplineModel')

module.exports = class CourseService {
    async findAll(){
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM disciplina", (err, res) => {
                if(err) reject(err);

                resolve(res);
            })
        });
    }
    async findById(disciplineId){
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM disciplina WHERE codigo = ?", disciplineId, (err, res) => {
                if(err) 
                    reject(err);
                else if(res.length > 0)
                    resolve(res);

                reject(err);
            })
        });
    }
    async findPageByCourseId(courseId, start, limit){
        return new Promise((resolve, reject) => {
            db.query("SELECT count(*) as TotalCount FROM disciplina", (err, res) => {
                if(err) reject(err);
                
                const totalCount = res[0].TotalCount;

                var query = "SELECT * FROM disciplina WHERE cur_codigo = ? ORDER BY codigo DESC LIMIT ? OFFSET ?";
                const params = [courseId, limit, start];
    
                query = db.format(query, params);
                db.query(query, (err, data) => {
                    if(err) reject(err);
                    
                    resolve({totalCount, data});
                });
            });
        });
    }
    async addDiscipline(discipline){
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO disciplina set ?", discipline, (err, res) => {
                if(err) reject(err);
                
                resolve(res);
            })
        });
    }
    async updateDiscipline(disciplineId, newDiscipline, courseId){
        return new Promise((resolve, reject) => {
            this.findById(disciplineId)
                .then(oldDiscipline => {
                    const finalDiscipline = new DisciplineModel(
                        !newDiscipline.descricao ? oldDiscipline[0].descricao : newDiscipline.descricao,
                        courseId
                    );

                    var query = `UPDATE disciplina 
                                 SET descricao = ?, 
                                     cur_codigo = ? 
                                 WHERE codigo = ?`; 
                                                       
                    const params = [
                        finalDiscipline.descricao, 
                        courseId,
                        disciplineId
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
    async deleteDiscipline(disciplineId){
        return new Promise((resolve, reject) => {
            this.findById(disciplineId)
                .then(response => {
                    db.query('DELETE FROM disciplina WHERE codigo = ?', disciplineId, (err, res) => {
                        if (err) reject(err);
                
                        resolve(res);
                    });
                })
                .catch(err => reject(err))
        });
    }
}