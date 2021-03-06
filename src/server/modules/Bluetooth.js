
const { execSync } = require('child_process');
const chalk = require('chalk');

class Bluetooth {

    constructor (portName = 'COM9', portNumber = 9600){
        this.varName = '$port';
        this.portName = portName;
        this.portNumber = portNumber;
    }    
    
    /**
     * 
     * @param {String} content Request to arduino 
     * @return {String} Response from arduino 
     */
    channel(content = ''){
        return this.runCommand([
            'powershell',
            `${this.varName}= new-Object System.IO.Ports.SerialPort ${this.portName},${this.portNumber},None,8,one`,
            `${this.varName}.open()`,
            `${this.varName}.Write('${content}')`,
            `${this.varName}.ReadLine()`,
            `${this.varName}.close()`
        ].join(';'));
    }

    dummyChannel(content = ''){     
        const cmd = [
            'powershell',
            'sleep 1',
            `echo '${content}:${Math.random() < 0.8 ? 1 : 0}'`
        ].join(';');  
        return this.runCommand(cmd);
    }

    runCommand(command){
        let result;
        try {
            result = execSync(command);
        } catch (error) {
            result = error;
            console.log(`${chalk.white.bgRed.bold(' Failed ')} >> ${chalk.red(result)}`);
        }
        return result;
    }
    
}

exports.Bluetooth = Bluetooth;