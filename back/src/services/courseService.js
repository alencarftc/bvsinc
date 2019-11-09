const db = require('../config/mysql');
const CourseModel = require('../app/models/courseModel');

module.exports = class CourseService {
  async findAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM curso ORDER BY codigo DESC', (err, res) => {
        if (err) { reject(err); } else { resolve(res); }
      });
    });
  }

  async findById(courseId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM curso WHERE codigo = ?', courseId, (err, res) => {
        if (err) {
          reject(err);
        } else if (res.length > 0) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }

  async addCourse(course) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO curso set ?', course, (err, res) => {
        if (err) reject(err);

        resolve(res);
      });
    });
  }

  async updateCourse(courseId, newCourse) {
    return new Promise((resolve, reject) => {
      this.findById(courseId)
        .then((oldCourse) => {
          const finalCourse = new CourseModel(
            !newCourse.descricao ? oldCourse[0].descricao : newCourse.descricao,
          );

          let query = `UPDATE curso 
                                 SET descricao = ? 
                                 WHERE codigo = ?`;

          const params = [
            finalCourse.descricao,
            courseId,
          ];

          query = db.format(query, params);
          db.query(query, (err, res) => {
            if (err) reject(err);

            resolve(res);
          });
        })
        .catch((err) => reject(err));
    });
  }

  async deleteCourse(courseId){
    return new Promise((resolve, reject) => {
      this.findById(courseId)
        .then(response => {
            db.query('DELETE FROM curso WHERE codigo = ?', courseId, (err, res) => {
              if (err) reject(err);
      
              resolve(res);
            });
        })
        .catch(err => reject(err))
    });
  }
};
