module.exports = app => {
    app.locals = Object.assign(app.locals, {
        __DEV__ : process.env.NODE_ENV !== 'production',
        appName : "Memeshare",
        lang : "pt-BR",
        title: "",
        meta : [],
        link : [],
        css  : [],
        js   : [],
        fjs  : []
    });

    app.use((req, res, next) => {
        res.view = (view, vars) => {
            vars = typeof vars === "object" ? vars : {};
            vars.__view__ = view;
            return res.render('view', vars);
        };

        next();
    });
};