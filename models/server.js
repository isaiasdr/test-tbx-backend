const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = 4500;

        //middlewares
        this.middleware();

        //routes
        this.routes();
    }

    async connectDb () {
        await dbConnection();
    }

    middleware() {
        //CORS
        this.app.use( cors() );

        //Lecture and parse body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use('/files', require('../routes/files'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`server running in port:`, this.port);
        });
    }
}

module.exports = Server;