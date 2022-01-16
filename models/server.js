const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { connect } = require('../db/config');
const { socketController } = require('../sockets/socketControllers');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {
            auth:       '/api/auth/',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            users:      '/api/users/',
            uploads:    '/api/uploads'  
        } 

        //Conectar a DB
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

        // Server
        this.sockets();
    }

    async dbConnection() {

        await connect();
        
    }

    middlewares () {

        // cors
        this.app.use(cors());

        
        this.app.use(express.json());
        // directorio publico
        
        // this.app.use(express.static('public'));

        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes () {

        this.app.post('/', (req, res)=>{

            console.log(req);
            res.json({
                messages:[
                    {
                        status:
                        {
                            groupName: 'PENDING'
                        }
                    }
                ]
            });
        });
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    sockets(){
        this.io.on('connection', (sockets) => socketController(sockets, this.io))
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('server escuchando en puerto', this.port)
        });
    }
}

module.exports = Server