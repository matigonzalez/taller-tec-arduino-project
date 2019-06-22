
const express = require('express');
const application = express();
const { join } = require('path');
const { WEBSITE_PATH, ASSETS_PATH, ASSETS_FOLDER, NODE_MODULES_PATH } = require('./_configuration');


class Router {

    constructor (){
        application.use(`${ASSETS_FOLDER}`,express.static(ASSETS_PATH));
        application.listen(3000, () => console.log('Ctrl + C'));
    }    

    endpoint(path = '', method = () => { }, options = { }) {
        options = Object.assign({ verb: 'get', context: null }, options);
        application[options.verb.toLowerCase()](path, (request, response) =>
            response.send(method.apply(options.context, [request]) + '')
        );
    }

    page(path = '', filedir){
        application.get(path, (request, response) => 
            response.sendFile(join(WEBSITE_PATH, filedir))
        );
    }

    library(path = '', filedir){
        application.get('/@' + path, (request, response) => 
            response.sendFile(join(NODE_MODULES_PATH, filedir))
        );
    }
}

exports.Router = new Router;