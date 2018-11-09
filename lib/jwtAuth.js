/**
 * @module JSON Web Token
 * @description Defines a middleware what validate a JWT.
 * @author David López Rguez
 */

'use strict';

const jwt = require('jsonwebtoken');

// Middlewares de authenticación
module.exports = () => {
  return function (req, res, next) {
    // leer credenciales
    const token = req.body.token || req.query.token || req.get('x-access-token');

    if (!token) {
      const err = new Error('NO_TOKEN_PROVIDED');
      err.status = 401;
      next(err);
      return;
    }

    // comprobar credenciales
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      console.log('verificando token')
      if (err) {
        const err = new Error('INVALID_TOKEN');
        err.status = 401;
        next(err);
        return;
      }

      // guardamos info en la request para los siguientes middlewares
      req.userId = decoded.user_id;
      console.log('El id es ', req.userId)
      // continuar llamando a next
      next();
    });
  };
};