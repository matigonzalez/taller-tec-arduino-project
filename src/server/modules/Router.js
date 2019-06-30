
const express = require('express');
const application = express();
const { join } = require('path');
const { WEBSITE_PATH, ASSETS_PATH, ASSETS_FOLDER, NODE_MODULES_PATH } = require('./_configuration');
const WebSocket = require('ws');
const http = require('http');

class Router {

    constructor (){
        //http
        application.use(`${ASSETS_FOLDER}`,express.static(ASSETS_PATH));
        application.listen(3000, () => console.log('Ctrl + C'));
        //ws
        this.server = http.createServer(application);   
        this.server.listen(8000); 
        this.ws = new WebSocket.Server( { server: this.server } ); 
    }    

    endpoint(path = '', method = () => { }, options = { }) {
        options = Object.assign({ verb: 'get', context: null }, options);
        application[options.verb.toLowerCase()](path, (request, response) =>
            response.send(method.apply(options.context, [request]) + '')
        );
    }

    page(path = '', filedir){
        application.get(path, (request, response) => 
            response.sendFile(join(WEBSITE_PATH, typeof filedir === "function" ? filedir() : filedir))
        );
    }

    library(path = '', filedir){
        application.get('/@' + path, (request, response) => 
            response.sendFile(join(NODE_MODULES_PATH, filedir))
        );
    }

    websocket(){  
        return new Promise ((resolve, reject)=>{
            this.ws.on('connection', (connection)=>{
                resolve(connection);
            });    
        });
    }
}

exports.Router = new Router;