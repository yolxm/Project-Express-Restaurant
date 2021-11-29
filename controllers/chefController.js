const connection = require("../config/bd");
const sha1 = require("sha1");

class chefController {

    homePage(req, res){
        let sqlChef = `SELECT * FROM chef`;
        let sqlDish = `SELECT * FROM dish`;
        connection.query(sqlChef, (error, resultChef) => {
            if(error) throw error;
            connection.query(sqlDish, (error, resultDish) => {
                if (error) throw error;
                res.render("home", {resultChef, resultDish}); 
            })
        })
    }

    oneChef(req, res){
        
            let chef_id = req.params.chef_id;
            let sqlChef = `SELECT * FROM chef WHERE chef_id = ${chef_id}`;
            let sqlDish = `SELECT * FROM dish WHERE chef_id = ${chef_id}`;
            connection.query(sqlChef, (error, resultChef) => {
                if(error) throw error;
                connection.query(sqlDish, (error, resultDish) => {
                    if (error) throw error;
                    res.render("chef", {resultChef, resultDish});
                })
            })
    }

    formLogin(req, res){
        res.render("login");
    }

    logIn(req, res){
        let {email, password} = req.body;
        let passwordChef = sha1(password);
        let sql = `SELECT * FROM chef WHERE email = '${email}' AND password = '${passwordChef}'`;
    
        connection.query(sql, (error, result) => {
            if (error) throw error;
            if(!result[0]){
              res.render("login", {errorLogin: 'error'})
            }
            else{
                //te lleva a la pagina principal
                res.redirect("/");
            }
        });
    }

    formRegister(req, res){
        res.render("crear_chef");
    }

    saveChef (req, res){
        let { name, last_name, email, password, employment_history, phone_number } = req.body;
        let image = req.file.filename;
        let passwordChef = sha1(password);
        let sql = `INSERT INTO chef (name, last_name, email, password, employment_history, phone_number, image) VALUES ('${name}', '${last_name}', '${email}', '${passwordChef}', '${employment_history}', '${phone_number}', '${image}')`;
        connection.query(sql, (error, result) => {
            res.redirect("/");
        });
    }

    viewEditFormChef(req, res){
        let chef_id = req.params.chef_id;
        let sql = `SELECT * FROM chef WHERE chef_id = ${chef_id}`
        connection.query(sql, (error, result) =>{
          if (error) throw error;
          res.render("editChef", {result});
        });
    }

    editChef(req, res){
        let chef_id = req.params.chef_id;
        let { name, last_name, email, password, employment_history, phone_number } = req.body;
        let passwordChef = sha1(password);
        let sql;
        if (req.file === undefined) {
          sql = `UPDATE chef SET name = '${name}', last_name = '${last_name}', email = '${email}', password = '${passwordChef}', employment_history = '${employment_history}', phone_number = '${phone_number}' WHERE chef_id = ${chef_id}`;
        } else {
          let image = req.file.filename;
          sql = `UPDATE chef SET name = '${name}', last_name = '${last_name}', email = '${email}', password = '${passwordChef}', employment_history = '${employment_history}', phone_number = '${phone_number}', image = '${image}' WHERE chef_id = ${chef_id}`;
        }
        connection.query(sql, (err, result) => {
          if (err) throw err;
          res.redirect(`/chef/${chef_id}`);
        });
    }
}

module.exports = new chefController();