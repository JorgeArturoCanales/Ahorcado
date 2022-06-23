const listaPalabras = ['caballo', 'oveja', 'cerdo', 'chimpance'];
let palabraAdivinar = [];
let historialLetrasUsuario = [];
let numIntentos = 7;
let palabraMostrar = [];
let puntaje = 0;
    
let cantPalabras= listaPalabras.length;
const posicionPalabraAleatoria = Math.floor((Math.random() * cantPalabras));
palabraAdivinar = listaPalabras[posicionPalabraAleatoria];
                
for (let i = 0; i < palabraAdivinar.length; i++) {
    palabraMostrar[i] = '_';
}

const audioGanador = new Audio('media/audio/ganador.mp3');
const audioPerdedor = new Audio('media/audio/perdedor.mp3');
const audioAcierto = new Audio('media/audio/acierto.mp3');
                    
document.querySelector('#palabra').textContent = palabraMostrar.join(' ');
document.querySelector('#intentos').textContent = numIntentos;  

document.querySelector('#comprobar').addEventListener('click', () => { 

    if(document.querySelector('#letra').value==''){
        document.querySelector('#letra').placeholder = "Debe Ingresar Una Letra!";
        document.querySelector('#letra').focus();
    }else{
        document.querySelector('#letra').placeholder = "Ingrese Un Carácter";
        let letraIngresada = document.querySelector('#letra').value;
        historialLetrasUsuario.push(letraIngresada);
        let flag=0;    
                
        let aciertosActuales = 0;
        for (let i = 0; i < palabraAdivinar.length; i++) {
            if(palabraAdivinar[i]==letraIngresada){
                palabraMostrar[i] = letraIngresada;
                aciertosActuales++;
            }
        }
    
        let letraRepetidaHistorial=0;
        for (let i = 0; i < historialLetrasUsuario.length-1; i++) {
            if(letraIngresada==historialLetrasUsuario[i]){
                letraRepetidaHistorial++;
            }
        }

        let letraRepetidaPalabra=0;
        for (let i = 0; i < palabraAdivinar.length; i++) {
            if(letraIngresada==palabraAdivinar[i]){
                letraRepetidaPalabra++;
            }
                    
        }

        if(letraRepetidaPalabra>0){
            if(letraRepetidaHistorial>0){
                puntaje=puntaje;
                numIntentos--;
            }else{
                puntaje+=150;
                audioAcierto.play().catch(e => console.log(e));
            }
        }else{
            puntaje-=150;
            numIntentos--;

            if(puntaje==0 || puntaje==-150){
                puntaje=0;
            }
        }

    
        document.querySelector('#palabra').textContent = palabraMostrar.join(' ');
        document.querySelector('#historial').textContent = historialLetrasUsuario.join(' ');
        const porcentajeAvance = obtenerPorcentaje();
        document.querySelector('#barra').style.width = ''+porcentajeAvance+'%';
        document.querySelector('#intentos').textContent = numIntentos;
        document.querySelector('#puntaje').textContent = puntaje;
        document.querySelector('#letra').value = '';
        document.querySelector('#letra').focus();

        if(numIntentos==6){
            document.querySelector('#img').src = "media/img/intento2.png";
        }else if(numIntentos==5){
            document.querySelector('#img').src = "media/img/intento3.png";
        }else if(numIntentos==4){
            document.querySelector('#img').src = "media/img/intento4.png";
        }else if(numIntentos==3){
            document.querySelector('#img').src = "media/img/intento5.png";
        }else if(numIntentos==2){
            document.querySelector('#img').src = "media/img/intento6.png";
        }else if(numIntentos == 1){
            document.querySelector('#img').src = "media/img/intento7.png";
        }else if(numIntentos == 0){
            document.querySelector('#img').src = "media/img/intento8.png";
            document.querySelector('#comprobar').disabled = true;
            audioPerdedor.play().catch(e => console.log(e));

            Swal.fire({
                title: 'Intentos Completados...',
                width: 600,
                html:
                    '<hr>¡La Palabra Oculta Era <b>'+listaPalabras[posicionPalabraAleatoria]+'</b>!'+
                    '<br>Puntuacion Final: <b>'+puntaje+'</b>',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#033FA9',
                background: '#D7DCE5',
                        
                backdrop: `
                    rgba(243, 6, 6,0.3)
                    url("media/gif/perdedor.gif")
                    left top
                    no-repeat
                `
            }).then((result) => {
                if(result.value){
                    location.reload();
                }         
            })
                    
        }

        let aciertosTotales=0;
        for (let i = 0; i < palabraAdivinar.length; i++) {
            if(palabraMostrar[i]!='_'){
                aciertosTotales++;
                console.log('acierto');
            }
        }
        console.log(aciertosTotales);
        if(aciertosTotales==palabraAdivinar.length){
            audioGanador.play().catch(e => console.log(e));

            Swal.fire({
                title: '¡Palabra Completada!',
                width: 600,
                html:
                    '<hr>¡La Palabra Adivinada Fue <b>'+listaPalabras[posicionPalabraAleatoria]+'</b>!'+
                    '<br>Puntuacion Final: <b>'+puntaje+'</b>',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#033FA9',
                background: '#D7DCE5',
                        
                backdrop: `
                    rgba(21, 175, 0,0.3)
                    url("media/gif/ganador.gif")
                    left top
                    no-repeat
                `
            }).then((result) => {
                if(result.value){
                    location.reload();
                }
                        
            })
        }
    }
           
});
    

function funcionRecargarPag() {
    location.reload();
    document.querySelector("#refrescar").style.transform= "rotate(60deg)";
    document.querySelector("#refrescar").style.transform= "rotate(90deg)";
}

function obtenerPorcentaje(){
    let numEspacios=0;
    for (let i=0; i<palabraAdivinar.length; i++){
        if(palabraMostrar[i]!='_'){
            numEspacios++;
        }
    }
    
    return (numEspacios/palabraAdivinar.length)*100;
}