const connection = require("../config/bd");

class dishController {

    formCreateDish(req, res){
        let sqlChef = `SELECT * FROM chef`;
        let sqlDish = `SELECT * FROM dish`;
        connection.query(sqlChef, (error, resultChef) => {
            if(error) throw error;
            connection.query(sqlDish, (error, resultDish) => {
                if (error) throw error;
                res.render("registrerDish", {resultChef, resultDish}); 
            })
        })
    }

    saveNewDish(req, res){
        let { dish_name, description, chef_id } = req.body;
        let image = req.file.filename;
        let sql = `INSERT INTO dish (dish_name, description, image, chef_id) VALUES ('${dish_name}', '${description}', '${image}', ${chef_id})`;
        connection.query(sql, (error, resultDish) => {
            if (error) throw error;
            res.redirect("/");
    
        });
    }

    deleteDish(req, res){
        let {dish_id, chef_id} = req.params;
        console.log('params', req.params);
        let sql = `DELETE FROM dish WHERE dish_id = ${dish_id}`;
        connection.query(sql, (error, result) => {
            if (error) throw error;
            res.redirect(`/chef/${chef_id}`);
        });
    }

    formEditDish(req, res){
        let dish_id = req.params.dish_id 
        let sql = `SELECT * FROM dish WHERE dish_id = ${dish_id}`;
        connection.query(sql, (error, resultDish) =>{
            if(error) throw error;
            res.render("editDish", {resultDish});
        });
    }

    saveEditedDish(req, res){
        let dish_id = req.params.dish_id;
        let chef_id = req.params.chef_id;
        let {dish_name, description} = req.body;
        let sql;
        if (req.file === undefined) {
            sql = `UPDATE dish SET dish_name = '${dish_name}', description = '${description}' WHERE dish_id = ${dish_id}`;
        } else {
            let image = req.file.filename;
            sql = `UPDATE dish SET dish_name = '${dish_name}', description = '${description}', image = '${image}' WHERE dish_id = ${dish_id}`;
        }
        connection.query(sql, (error, resultado) => {
            if (error) throw error;
            res.redirect(`/chef/${chef_id}`);
        });
    }
}

module.exports = new dishController();