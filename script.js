
//funcion constructora canvas
function Canvas(){
    this.canvas = null;
    this.ctx = null;
    this.imagen = new Image();
};

Canvas.prototype = {
    inicio: function(){
        if (this.canvas && this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            if (this.ctx) {
                return this.ctx;
                
            } else {
                return null
            }
            
        }
    },
    procesaImagen: function(){
        canvas.limpiar();
        this.ctx.drawImage(this.imagen,10,10);
    },
    filtro: function(tipo){
        if (tipo =='oscurecer') {
            new Oscurecer(this); //creamos un objeto y le pasamos la imagen
        }
        if (tipo =='aclarar') {
            new Aclarar(this); 
        }

        if (tipo =='grises') {
            new Grises(this); 
        }
    },
    limpiar: function(){
        var w = this.imagen.width;
        var h = this.imagen.heigth;
        this.ctx.clearRect(10,10,w,h)// funcion de canvas

    },
    cargar: function(archivo){
        this.imagen.src = 'assets/' + archivo;
        this.imagen.onload = function (e) {
            canvas.procesaImagen();
        }
    },
    dibujar: function(datos){
        this.ctx.putImageData(datos,10,10);
    },
};


function Filtro(canvas){
    this.w = canvas.imagen.width;
    this.h = canvas.imagen.height;
    this.imagenData = canvas.ctx.getImageData(10,10,this.w, this.h); //recuperamos la info de la imagen en la coordenada 10,10
    this.data = this.imagenData.data; //extraemos la informacion en un objeto 
};

function Oscurecer(canvas){
    f = new Filtro(canvas);
    for (let i = 0; i < f.data.length; i+=4) {// lo recorremos de 4 en 4 porque tenemos 4 canales (r,v,a, alfa)
        //restamos 100 para oscurecerlo
        f.data[i]  -= 100 //rojo
        f.data[i+1] -= 100 // verde
        f.data [i+2] -= 100 //azul      
    }
    canvas.dibujar(f.imagenData)
}

function Aclarar(canvas){
    f = new Filtro(canvas);
    for (let i = 0; i < f.data.length; i+=4) {// lo recorremos de 4 en 4 porque tenemos 4 canales (r,v,a, alfa)
        //sumamos 100 para oscurecerlo
        f.data[i]  += 100 //rojo
        f.data[i+1] += 100 // verde
        f.data [i+2] += 100 //azul      
    }
    canvas.dibujar(f.imagenData)
}

function Grises(canvas){
    f = new Filtro(canvas);
    for (let i = 0; i < f.data.length; i+=4) {// lo recorremos de 4 en 4 porque tenemos 4 canales (r,v,a, alfa)
        //media
        var gris = (f.data[i]+f.data[i+1]+f.data[i+2]/3)
        f.data[i]  = gris //rojo
        f.data[i+1] = gris // verde
        f.data [i+2] = gris //azul      
    }
    canvas.dibujar(f.imagenData)
}

window.onload = function(){
    var archivoSelect = document.getElementById('archivo');
    var filtroSelect = document.getElementById('filtro');

    //Eventos
    archivoSelect.onchange = function (e) {
        canvas.cargar(archivoSelect.value);//al seleccionar el archivo le pasa el value a la funcion cargar
        
    };

    filtroSelect.onchange = function (e) {
        canvas.filtro(filtroSelect.value);//al seleccionar el filtro le pasa el value a la funcion filtro
        
    };

    //Código
    canvas = new Canvas ();//Creamos un nuevo canvas 
    canvas.canvas = document.getElementById('canvas');
    if (canvas.inicio()) {
        canvas.cargar('images.jpeg');
        
    } else{
        alert('Tu navegador no soporta canvas de HTML5');
    }
}