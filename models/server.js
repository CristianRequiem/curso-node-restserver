const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // Directorio público
        this.app.use(express.static('public'))

        // Lectura y parseo del body
        this.app.use(express.json());

        //Cors (Cross-origin resource sharing)
        this.app.use(cors());
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor levantado en el puerto', this.port);
        });
    }
}

module.exports = Server;