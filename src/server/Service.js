
const { Router } = require('./modules/Router');
const { Bluetooth } = require('./modules/Bluetooth');

class Service {

    constructor (){

        /**
         * BLUETOOTH SETUP
         */
        // For testing: cambiar las opciones para el bluetooth aca:
        this.bluetooth = new Bluetooth('COM9', 9600);

        /**
         * ROUTES
         */
        Router.page('/', ()=>{    
            // For testing: Cuando se ingresa a localhost:3000 desde el navegador
            // se llama a este metodo keepReading que envía los datos al website/aplicación.
            // aca es donde se envia un texto al arduino y este retorna la respuesta, que es 1 en 
            // caso de true, y 0 en caso de false. El método dummyChannel es de prueba. cambienlo a 
            // channel cuando lo usen en el arduino, tal como el siguiente ejemplo:
            // this.keepReading( ()=>this.bluetooth.channel('waterStatus') );
            // this.keepReading( this.bluetooth.channel('voltStatus') );
            // this.keepReading( this.bluetooth.channel('switchStatus') );
            // el parametro waterStatus, voltStatus o switchStatus
            // es el texto de que se envia a arduino. Esas son las opciones, 
            // pero hayq ue leer uno a la vez porque tenemos una sola entrada enel arduino.

            this.keepReading( ()=>this.bluetooth.dummyChannel('waterStatus') );
            return 'index.html'
        });

        Router.library('/jquery', 'jquery/dist/jquery.min.js');
        Router.endpoint('/water', this.readWater, {context: this});
        Router.endpoint('/volt', this.readVolt, {context: this});
        Router.endpoint('/switch', this.readSwitch, {context: this});
        Router.endpoint('/kill', process.exit);
        
        // this.keepReading( this.bluetooth.dummyChannel('voltStatus') );
        // this.keepReading( this.bluetooth.dummyChannel('switchStatus') );
    }    

    readWater(){
        return this.bluetooth.dummyChannel('Dummy water');
    }

    readVolt(){
        // return this.bluetooth.channel();
        return "this.bluetooth.channel() for readVolt";
    }
    readSwitch(){
        // return this.bluetooth.channel();
        return "this.bluetooth.channel() for readSwitch";
    }

    keepReading(source, time = 500){
        const ws = Router.websocket();
        setInterval(()=>{
            const message = source();
            ws.then((connection)=>{
                connection.send(!message.toString ? message : message.toString());
                // connection.close();
            });
        }, time);
    }
}

new Service();
