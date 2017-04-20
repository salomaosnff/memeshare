const codes = {
    '400': 'Pedido Ruim',
    '401': 'Não Autorizado',
    '403': 'Acesso Proibido',
    '404': 'Não Encontrado',
    '500': 'Erro Interno do Servidor'
};

const http_error = code => {
    let error;

    code = code < 400 && code >= 600 ? 500 : code;
    code = codes.hasOwnProperty(code) ? code : 500;

    error = new Error(codes[code]);
    error.statusCode = code;
    error.isHttp = true;

    return error;
};

module.exports = app => {
    app.use((req, res, next) => {
        res.error = code => {
            next(http_error(code))
        }

        next();
    });
};