
const { Router } = require('./modules/Router');
const { Bluetooth } = require('./modules/Bluetooth');

class Service {

    constructor (){

        /**
         * BLUETOOTH SETUP
         */
        this.bluetooth = new Bluetooth('COM9', 9600);
        this.bluetooth.channel();

        /**
         * ROUTES
         */
        Router.page('/', 'index.html');
        Router.library('/jquery', 'jquery/dist/jquery.min.js');
        Router.endpoint('/water', this.readWater, {context: this});
        Router.endpoint('/volt', this.readVolt, {context: this});
        Router.endpoint('/switch', this.readSwitch, {context: this});
        Router.endpoint('/kill', process.exit);

    }    

    readWater(){
        // return this.bluetooth.channel('text');
        return "this.bluetooth.channel('text') for readWater";
    }
    readVolt(){
        // return this.bluetooth.channel();
        return "this.bluetooth.channel() for readVolt";
    }
    readSwitch(){
        // return this.bluetooth.channel();
        return "this.bluetooth.channel() for readSwitch";
    }
}

new Service();
