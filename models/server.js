const express = require('express');
const cors = require('cors');
const { router } = require('../routes/users');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users/'

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    middlewares () {

        // cors
        this.app.use(cors());

        
        this.app.use(express.json());
        // directorio publico
        
        this.app.use(express.static('public'));
    }

    routes () {

        this.app.use(this.usersPath, router)

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('server escuchando en puerto', this.port)
        });
    }
}

module.exports = Server