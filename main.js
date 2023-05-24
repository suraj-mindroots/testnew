// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { exec } = require("child_process");
const { spawn } = require('child_process');
const soap = require('soap')

function readNFC(nfcEvt, callback) {
    var os = new os_func();
    let cmd = 'cd nfc-pcsc && npm run read_nfc';
    os.execCommand(cmd, function (res) {
        let nfcID = cleanNfcData(res);
        sendToWS(nfcID, nfcEvt, function(res){
            callback(res);
        });
    })
}

function cleanNfcData(res) {
    regxp = /\{{(.*?)\}}/g;
    let str = res.trim().match(regxp);
    str = str[0];
    str = str.replace(/[^a-zA-Z0-9]/g, '');
    return str;
}


function sendToWS(nfcID, nfcEvt, callback) {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let today = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'http://esbdesa.tpsv.cl:8181/cxf/IntegracionesRestSgp/marcaTotem',
        'headers': {
        },
        formData: {
            'idTarjeta': nfcID,
            'fecha': today,
            'tipoEvento': nfcEvt
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        callback(response.body);
    });

}

function os_func() {
    this.execCommand = function (cmd, callback) {
        exec(cmd, (error, stdout, stderr) => {
            callback(stdout)
        });
    }
}

let window;

function createWindow() {
    // Create the browser window.
    window = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })

    // and load the index.html of the app.
    window.loadFile('src/ui/index.html')

    // Open the DevTools.
    window.webContents.openDevTools()
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})


module.exports = {
    createWindow,
    readNFC
}

