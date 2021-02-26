const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    // Validar si hay errores en los datos enviados mediante express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
};