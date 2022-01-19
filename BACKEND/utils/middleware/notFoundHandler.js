const boom = require('@hapi/boom');

//No recibe un next porque el notFound se ejectua al final de todas las rutas cuando ya no encontro ninguna
function notFoundHandler(req, res) {
    const { 
        output: {statusCode, payload}
     } = boom.notFound();

    res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;