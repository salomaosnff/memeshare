const
    path        = require('path'),
    express     = require('express'),
    bodyParser  = require('body-parser'),
    loader      = require('tapioca-load'),
    http_error  = require('./includes/http_errors'),
    app         = express();

// Configuration
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.set('port', 3000);

app.use(express.static(path.resolve(__dirname, "public")));

// Tapioca carrega as rotas da pasta app/routes
loader({ cwd: __dirname, log: 4 })
    .add("includes/http_errors.js")
    .add("includes/view.js")
    .add("models")
    .add("routes")
    .load(app);

// Erro 404
app.use((req, res) => {
    res.error(404);
});

// Tratamento de erros
app.use((error, req, res, next) => {
    let title, view, status;

    // É um Erro HTTP?
    if(error.isHttp){
        title  = "Erro "+error.statusCode+": "+error.message;
        view   = 'http';
        status = error.statusCode
    } else {
        title  = "Erro 500: Erro Interno";
        view   = 'error';
        status = 500
    }

    res.status(status);

    res.view('errors/'+view, {
        css  : ["/css/error.css"],
        title,
        error
    });
});

// Exports App
module.exports = app;