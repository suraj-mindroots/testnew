const Swal = require('sweetalert2');
const electron = require('electron');

const remote = electron.remote;
const main = remote.require('./main');

const servidor = document.getElementById('servidor');
const startJob = document.getElementById('startJob');
const endJob = document.getElementById('endJob');
const startLunch = document.getElementById('startLunch');
const endLunch = document.getElementById('endLunch');


startJob.addEventListener('submit', function (event) {
    event.preventDefault();
    submitNfcEvent(1);
});

startLunch.addEventListener('submit', function (event) {
    event.preventDefault();
    submitNfcEvent(2);
});

endLunch.addEventListener('submit', function (event) {
    event.preventDefault();
    submitNfcEvent(3);
});

endJob.addEventListener('submit', function (event) {
    event.preventDefault();
    submitNfcEvent(4);
});

function submitNfcEvent(nfc_evt) {
    try {
        //Mostrar si el servidor esta prendido
        if (servidor =='1')

        //Iniciar Modal Verificacion
        Swal.fire({
            text: "Acerque su tarjeta al lector",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi-99kB3CP4QK9g9DwBXzG3JRMGgxrM14QYA&usqp=CAU",
            imageWidth: '200px',
            imageHeight: '200px'
        })
        main.readNFC(nfc_evt, function (res) {
            console.log(res);
                 if (res == 1) {
                 Swal.fire({
                     title: 'Correcto!',
                     text: 'Datos enviados correctamente',
                     icon: 'success',
                     confirmButtonText: 'OK'
                });
            }     if (res == 2) {
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Datos enviados correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
               }); 
            }     if (res == 3) {
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Datos enviados correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
               });
            }     if (res == 4) {
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Datos enviados correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
               });
            }else {
                 Swal.fire({
                     title: 'Error!',
                     text: 'Error al intentar enviar los datos',
                     icon: 'error',
                     confirmButtonText: 'OK'
                 });
             }
        });
    } catch (error) {
        console.log(error);
    }
  }