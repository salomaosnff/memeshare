/**
 * Created by sallon on 19/04/17.
 */
module.exports = app => {
    app.route("/").get((req, res, next) =>{
        res.view('home',{
            title: "Bem vindo ao MemeShare!",
            css: ['/css/home.css']
        });
    });
};